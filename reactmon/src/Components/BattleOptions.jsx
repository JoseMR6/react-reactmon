import { useEffect, useState } from 'react'
import { useGame } from '../Logic/hooks/useGame'
import { ATTACKS, ATTACK_CATEGORYS, CREATURES, ELEMENTAL_TYPES, GAME_STATES, WINDOW_NAMES } from '../Logic/constants'
import './BattleOptions.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'
import { Creature } from '../Logic/classes/Creature'
import { applyMessageVars } from '../Logic/functions/languaje'

export function BattleOptions() {
    const { playerCreatures, rivalCreatures, indexActualCreaturePlayer,
        indexActualCreatureRival, initWindow, player, setPlayer, rival, setRival,
        setInitWindow, processAttack, setPlayerCreatures
    } = useGame()

    const [menu, setMenu] = useState(0)
    const [messages, setMessages] = useState([])

    const localPlayerCreature = playerCreatures
        ? playerCreatures[indexActualCreaturePlayer]
        : new Creature(
            0,
            {
                name: CREATURES[0].name,
                dark: 0
            },
            ELEMENTAL_TYPES.FIRE,
            [
                ATTACKS[0],
                ATTACKS[1]
            ],
            {
                maxHealth: 100,
                speed: 0,
                physicalAttack: 100,
                specialAttack: 20,
                physicalDefense: 30,
                specialDefense: 30
            }
        )

    const localRivalCreature = rivalCreatures
        ? rivalCreatures[indexActualCreatureRival]
        : new Creature(
            1,
            {
                name: CREATURES[1].name,
                dark: 6
            },
            ELEMENTAL_TYPES.GRASS,
            [
                ATTACKS[8],
                ATTACKS[9]
            ],
            {
                maxHealth: 100,
                speed: 0,
                physicalAttack: 20,
                specialAttack: 30,
                physicalDefense: 100,
                specialDefense: 30
            }
        )

    useEffect(() => {
        if (initWindow == WINDOW_NAMES.BATTLE_OPTIONS) {
            const modPlayer = structuredClone(player)
            modPlayer.liveCreatures = playerCreatures.length
            setPlayer(modPlayer)

            const modRival = structuredClone(rival)
            modRival.liveCreatures = rivalCreatures.length
            setRival(modRival)

            setInitWindow(null)
        } else if (initWindow == 'change' || initWindow == 'forcedChange') {
            const newMessages = []
            let randomAttackIndex = Math.floor(Math.random() * localRivalCreature.attacks.length)

            newMessages.push(
                {
                    name: "change",
                    vars: {
                        "player": player.name
                    }
                }
            )

            if (initWindow != 'forcedChange') {
                const message = processAttack(randomAttackIndex, false)
                if (message) newMessages.push(message)

                if (playerCreatures[indexActualCreaturePlayer].dead) {
                    newMessages.push(
                        {
                            name: "isDead",
                            vars: {
                                "player": player.name
                            }
                        }
                    )
                }
            }

            setInitWindow(null)
            setMessages(newMessages)
            setMenu(2)
        }

        const cloneCreatures=[]
        playerCreatures.forEach(creature => {
            cloneCreatures.push(Creature.cloneFromObject(creature))
        });
        setPlayerCreatures(cloneCreatures)
    }, []);

    return (
        <>

            <div className='generalBattleContainer'>

                <div className='battleContainer'>
                    {(localPlayerCreature && localRivalCreature)
                        &&
                        <>
                            <PlayerCreatureContainer
                                player={localPlayerCreature}
                            />
                            <PlayerCreatureContainer
                                player={localRivalCreature}
                                main={false}
                            />
                        </>
                    }
                </div>

                <div className='optionsContainer'>
                    {menu == 0 &&
                        <GeneralOptions setMenu={setMenu} />
                    }
                    {menu == 1 &&
                        <AttackOptions
                            setMenu={setMenu}
                            setMessages={setMessages}
                        />
                    }
                    {menu == 2 &&
                        <BattleMessage
                            setMenu={setMenu}
                            messages={messages}
                        />
                    }

                </div>
            </div>

        </>
    )
}

function PlayerCreatureContainer({ player, main = true }) {

    return (
        <>
            <div className={'playerCreatureContainer ' + (!main ? 'rival' : '')}>
                <div className='battleGround' />
                <div className='healthContainer'>
                    <meter className='healthBar'
                        value={player.recordedHealth} min="0"
                        max={player.stats.maxHealth}
                    />
                    {main &&
                        <span>{player.recordedHealth}
                            /{player.stats.maxHealth}
                        </span>
                    }

                </div>
                <div className='imgsContainer'>
                    <div className='iconsContainer'>
                        <ElemntIcon type={player.type} />
                        {player.recordedBuffs.cont > 0 &&
                            <div className='buffContainer'>
                                <img className={'category ' + ATTACK_CATEGORYS.SUPPORT}
                                    src={'./src/assets/categories/' + ATTACK_CATEGORYS.SUPPORT + '.svg'}
                                />
                                <div className='buffCount'>
                                    {
                                        player.recordedBuffs.cont
                                    }
                                </div>
                            </div>
                        }

                    </div>
                    <div className='creatureImgContainer'>
                        <CreatureImg
                            name={player.image.name}
                            type={player.type}
                            dark={player.image.dark}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

PlayerCreatureContainer.propTypes = {
    player: PropTypes.object.isRequired,
    main: PropTypes.bool
}

function GeneralOptions({ setMenu }) {
    const { languajeDocument, setGameState, changeWindow } = useGame()
    const lang = languajeDocument.BattleOptions

    return (
        <>
            <div className='option'
                onClick={() => { setMenu(1) }}
            >
                <span><b>{lang.attackButton}</b></span>
                <img className='attack'
                    src={'./src/assets/options/battle.svg'}
                />
            </div>
            <div className='option'
                onClick={() => {
                    changeWindow(WINDOW_NAMES.CREATURES_BACKPACK)
                }}
            >
                <span><b>{lang.changeButton}</b></span>
                <img className='change'
                    src={'./src/assets/options/change.svg'}
                />
            </div>
            <div className='option'
                onClick={() => {
                    setGameState(GAME_STATES.LOSE)
                    changeWindow(WINDOW_NAMES.LOSE_GAME)
                }}
            >
                <span><b>{lang.surrenderButton}</b></span>
                <img className='surrender'
                    src={'./src/assets/options/surrender.svg'}
                />
            </div>
        </>
    )
}

GeneralOptions.propTypes = {
    setMenu: PropTypes.func.isRequired
}

function AttackOptions({ setMenu, setMessages }) {
    const { languajeDocument, playerCreatures, rivalCreatures,
        indexActualCreaturePlayer, indexActualCreatureRival, player, rival,
        processAttack
    } = useGame()
    const lang = languajeDocument.BattleOptions
    const langA = languajeDocument.AttacksText

    const creature = Creature.cloneFromObject(playerCreatures[indexActualCreaturePlayer])
    const rivalCreature = Creature.cloneFromObject(rivalCreatures[indexActualCreatureRival])

    return (
        <>
            {creature.attacks.map((attack, index) => {
                return (
                    <div key={index} className='option'
                        onClick={() => {
                            const playerFirst = creature.getFirst(
                                rivalCreature, creature.recordedBuffs,
                                rivalCreature.recordedBuffs
                            )

                            const newMessages = []
                            let randomAttackIndex = Math.floor(Math.random() * rivalCreature.attacks.length)

                            if (playerFirst) {
                                const message = processAttack(index, true)
                                if (message) newMessages.push(message)

                                const message2 = processAttack(randomAttackIndex, false)
                                if (message2) newMessages.push(message2)
                            } else {
                                const message2 = processAttack(randomAttackIndex, false)
                                if (message2) newMessages.push(message2)

                                const message = processAttack(index, true)
                                if (message) newMessages.push(message)
                            }

                            if (playerCreatures[indexActualCreaturePlayer].dead) {
                                newMessages.push(
                                    {
                                        name: "isDead",
                                        vars: {
                                            "player": player.name
                                        }
                                    }
                                )
                            }

                            if (rivalCreatures[indexActualCreatureRival].dead) {
                                newMessages.push(
                                    {
                                        name: "isDead",
                                        vars: {
                                            "player": rival.name
                                        }
                                    }
                                )
                            }

                            setMessages(newMessages)
                            setMenu(2)
                        }}
                    >
                        <span className='name'>
                            <b>{langA[attack.name].name}</b>
                        </span>
                        <div className='icons'>
                            <img className={'category ' + attack.category}
                                src={'./src/assets/categories/' + attack.category + '.svg'}
                            />
                            <ElemntIcon type={attack.type} />
                        </div>
                    </div>
                )
            })}

            <div className='option'
                onClick={() => { setMenu(0) }}
            >
                <b>{lang.returnButton}</b>
            </div>

        </>
    )
}

AttackOptions.propTypes = {
    setMenu: PropTypes.func.isRequired,
    setMessages: PropTypes.func.isRequired
}

function BattleMessage({ setMenu, messages }) {
    const [actual, setActual] = useState(0)
    const { gameState, changeWindow, languajeDocument, setInitWindow } = useGame()
    const langM = languajeDocument.BattleMessages
    const langA = languajeDocument.AttacksText

    return (
        <>
            {messages.map((message, index) => {
                const sig = actual + 1

                if (message.vars && message.vars.attackName) {
                    message.vars.attack = langA[message.vars.attackName].name
                }

                if (actual == index) {
                    return (
                        <div key={index} className='messageContainer'>
                            <div className='battleMessage'>
                                {applyMessageVars(langM[message.name],
                                    message.vars
                                )}
                            </div>
                            <div className='continue'
                                onClick={() => {
                                    if (sig != messages.length) setActual(sig)
                                    else if (gameState == GAME_STATES.LOSE)
                                        changeWindow(WINDOW_NAMES.LOSE_GAME)
                                    else if (gameState == GAME_STATES.WIN)
                                        changeWindow(WINDOW_NAMES.WIN_OPTIONS)
                                    else if (message.name == 'isDead') {
                                        setInitWindow('dead')
                                        changeWindow(WINDOW_NAMES.CREATURES_BACKPACK)
                                    }
                                    else setMenu(0)



                                }}
                            >
                                <b>{langM.continue}</b>
                            </div>
                        </div>
                    )
                }

            })}


        </>
    )
}

BattleMessage.propTypes = {
    setMenu: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired
}