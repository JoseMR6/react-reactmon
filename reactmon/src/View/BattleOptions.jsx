import { useEffect, useState } from 'react'
import { useGame } from '../Controller/hooks/useGame'
import { ATTACKS, ATTACK_CATEGORYS, CREATURES, ELEMENTAL_TYPES, GAME_STATES, WINDOW_NAMES } from '../Model/constants'
import './BattleOptions.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'
import { Creature } from '../Model/Creature'

export function BattleOptions() {
    const { playerCreatures, rivalCreatures, indexActualCreaturePlayer,
        indexActualCreatureRival, initWindow, player, setPlayer, rival, setRival
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
        }
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
    const { languajeDocument } = useGame()
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
            <div className='option'>
                <span><b>{lang.changeButton}</b></span>
                <img className='change'
                    src={'./src/assets/options/change.svg'}
                />
            </div>
            <div className='option'>
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
    const { languajeDocument, setPlayerCreatures, setRivalCreatures, playerCreatures, rivalCreatures,
        indexActualCreaturePlayer, indexActualCreatureRival, player, setPlayer, rival, setRival,
        setGameState//, changeWindow
    } = useGame()
    const lang = languajeDocument.BattleOptions
    const langA = languajeDocument.AttacksText

    const creature = playerCreatures[indexActualCreaturePlayer]
    const rivalCreature = rivalCreatures[indexActualCreatureRival]

    const checkWinner = ((player, rival) => {
        if (player == null || player.liveCreatures <= 0) {
            setGameState(GAME_STATES.LOSE)
            //changeWindow(WINDOW_NAMES.LOSE_GAME)
        } else if (rival == null || rival.liveCreatures <= 0) {
            setGameState(GAME_STATES.WIN)
            //changeWindow(WINDOW_NAMES.WIN_OPTIONS)
        }
    })

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

                            const newPlayerCreatures = structuredClone(playerCreatures)
                            const newRivalCreatures = structuredClone(rivalCreatures)
                            const newMessages = []
                            let randomAttackIndex = Math.floor(Math.random() * rivalCreature.attacks.length)

                            if (playerFirst) {
                                const [newCreaturePlayer, newCreatureRival,
                                    newPlayer, newRival
                                ] = creature.doAttack(
                                    index, rivalCreature, player, rival
                                )

                                if (newCreaturePlayer != null && newCreatureRival != null) {
                                    newPlayerCreatures[indexActualCreaturePlayer] = newCreaturePlayer
                                    setPlayerCreatures(newPlayerCreatures)
                                    newRivalCreatures[indexActualCreatureRival] = newCreatureRival
                                    setRivalCreatures(newRivalCreatures)
                                    setPlayer(newPlayer)
                                    setRival(newRival)

                                    newMessages.push("Criatura de " + player.name
                                        + " usó " + attack.name
                                    )
                                }

                                checkWinner(newPlayer, newRival)

                                const [newCreatureRival2, newCreaturePlayer2,
                                    newRival2, newPlayer2
                                ] = rivalCreature.doAttack(
                                    randomAttackIndex, creature, rival, player
                                )

                                if (newCreaturePlayer2 != null && newCreatureRival2 != null) {
                                    newPlayerCreatures[indexActualCreaturePlayer] = newCreaturePlayer2
                                    setPlayerCreatures(newPlayerCreatures)
                                    newRivalCreatures[indexActualCreatureRival] = newCreatureRival2
                                    setRivalCreatures(newRivalCreatures)
                                    setPlayer(newPlayer2)
                                    setRival(newRival2)

                                    newMessages.push("Criatura de " + rival.name
                                        + " usó "
                                        + rivalCreature.attacks[randomAttackIndex].name
                                    )
                                }

                                checkWinner(newPlayer2, newRival2)
                            } else {
                                const [newCreatureRival2, newCreaturePlayer2,
                                    newRival2, newPlayer2
                                ] = rivalCreature.doAttack(
                                    randomAttackIndex, creature, rival, player
                                )

                                if (newCreaturePlayer2 != null && newCreatureRival2 != null) {
                                    newPlayerCreatures[indexActualCreaturePlayer] = newCreaturePlayer2
                                    setPlayerCreatures(newPlayerCreatures)
                                    newRivalCreatures[indexActualCreatureRival] = newCreatureRival2
                                    setRivalCreatures(newRivalCreatures)
                                    setPlayer(newPlayer2)
                                    setRival(newRival2)

                                    newMessages.push("Criatura de " + rival.name
                                        + " usó "
                                        + rivalCreature.attacks[randomAttackIndex].name
                                    )
                                }

                                checkWinner(newPlayer2, newRival2)

                                const [newCreaturePlayer, newCreatureRival,
                                    newPlayer, newRival
                                ] = creature.doAttack(
                                    index, rivalCreature, player, rival
                                )

                                if (newCreaturePlayer != null && newCreatureRival != null) {
                                    newPlayerCreatures[indexActualCreaturePlayer] = newCreaturePlayer
                                    setPlayerCreatures(newPlayerCreatures)
                                    newRivalCreatures[indexActualCreatureRival] = newCreatureRival
                                    setRivalCreatures(newRivalCreatures)
                                    setPlayer(newPlayer)
                                    setRival(newRival)

                                    newMessages.push("Criatura de " + player.name
                                        + " usó " + attack.name
                                    )
                                }

                                checkWinner(newPlayer, newRival)
                            }

                            if (playerCreatures[indexActualCreaturePlayer].dead) {
                                newMessages.push("Criatura de " + player.name
                                    + " se ha debilitado "
                                )
                            }

                            if (rivalCreatures[indexActualCreatureRival].dead) {
                                newMessages.push("Criatura de " + rival.name
                                    + " se ha debilitado "
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
    const {gameState, changeWindow} = useGame()

    return (
        <>
            {messages.map((message, index) => {
                const sig = actual + 1

                if (actual == index){
                    return (
                        <div key={index} className='messageContainer'>
                            <div className='battleMessage'>{messages[index]}</div>
                            <div className='continue'
                                onClick={() => {
                                    if (sig != messages.length) setActual(sig)
                                    else if(gameState==GAME_STATES.LOSE) 
                                        changeWindow(WINDOW_NAMES.LOSE_GAME)
                                    else if(gameState==GAME_STATES.WIN)
                                        changeWindow(WINDOW_NAMES.WIN_OPTIONS)
                                    else setMenu(0)
                                }}
                            >
                                <b>Continuar</b>
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