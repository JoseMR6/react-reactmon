import { useEffect, useState } from 'react'
import { useGame } from '../Logic/hooks/useGame'
import { ATTACK_CATEGORYS, GAME_STATES, INIT_STATES, PLAYER_ACTIONS, PLAYER_CREATURE_EXAMPLE, RIVAL_CREATURE_EXAMPLE, WINDOW_NAMES } from '../Logic/constants'
import './BattleOptions.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'
import { applyMessageVars } from '../Logic/functions/parse'
import { getRandomInt } from '../Logic/functions/calculations'
import { deadFilterChoose, getFirst } from '../Logic/functions/creature'

export function BattleOptions() {
    const { playerCreatures, rivalCreatures, indexActualCreaturePlayer,
        indexActualCreatureRival, initWindow, player, setPlayer, rival, setRival,
        setInitWindow
    } = useGame()

    const [menu, setMenu] = useState(0)
    const [playerAction, setPlayerAction] = useState({ action: null, param: null })

    const localPlayerCreature = playerCreatures
        ? playerCreatures[indexActualCreaturePlayer]
        : PLAYER_CREATURE_EXAMPLE

    const localRivalCreature = rivalCreatures
        ? rivalCreatures[indexActualCreatureRival]
        : RIVAL_CREATURE_EXAMPLE

    useEffect(() => {
        if (initWindow == WINDOW_NAMES.BATTLE_OPTIONS) {
            const modPlayer = structuredClone(player)
            playerCreatures.forEach(creature => {
                if(!creature.dead) modPlayer.liveCreatures++
            })
            setPlayer(modPlayer)
            const modRival = structuredClone(rival)
            modRival.liveCreatures = rivalCreatures.length
            setRival(modRival)

            setInitWindow(null)
        } else if (initWindow == INIT_STATES.CHANGE || initWindow == INIT_STATES.FORCED_CHANGE) {
            setPlayerAction({ action: PLAYER_ACTIONS.CHANGE, param: initWindow })
            setInitWindow(null)
            setMenu(2)
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
                            setPlayerAction={setPlayerAction}
                        />
                    }
                    {menu == 2 &&
                        <BattleMessage
                            setMenu={setMenu}
                            playerAction={playerAction}
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
                                    src={'./src/assets/categories/' +
                                        ATTACK_CATEGORYS.SUPPORT + '.svg'
                                    }
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

function AttackOptions({ setMenu, setPlayerAction }) {
    const { languajeDocument, playerCreatures,
        indexActualCreaturePlayer
    } = useGame()
    const lang = languajeDocument.BattleOptions
    const langA = languajeDocument.AttacksText

    const creature = structuredClone(playerCreatures[indexActualCreaturePlayer])

    const handleAttackClick = (index) => {
        setPlayerAction({ action: PLAYER_ACTIONS.ATTACK, param: index })
        setMenu(2)
    }

    return (
        <>
            {creature.attacks.map((attack, index) => {
                return (
                    <div key={index} className='option'
                        onClick={() => { handleAttackClick(index) }}
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
    setPlayerAction: PropTypes.func.isRequired
}

function BattleMessage({ setMenu, playerAction }) {
    const { gameState, changeWindow, languajeDocument, setInitWindow,
        playerCreatures, rivalCreatures, indexActualCreaturePlayer, indexActualCreatureRival,
        processAttack, player, rival, setIndexActualCreatureRival
    } = useGame()
    const [message, setMessage] = useState(null)
    const [nextAction, setNextAction] = useState(null)
    const langM = languajeDocument.BattleMessages
    const langA = languajeDocument.AttacksText

    useEffect(() => {
        let newAction = null
        const creature = structuredClone(playerCreatures[indexActualCreaturePlayer])
            const rivalCreature = structuredClone(rivalCreatures[indexActualCreatureRival])

        if (playerAction.action == PLAYER_ACTIONS.ATTACK) {
            const index = playerAction.param

            const playerFirst = getFirst(creature,
                rivalCreature
            )

            let randomAttackIndex = getRandomInt(rivalCreature.attacks.length)
            let processedCreatures
            let processedCreaturesRival

            if (playerFirst) {
                const [outputCreatures, outputCreaturesrival,
                    newMessage
                ] = processAttack(index, playerCreatures, rivalCreatures, true)
                setMessage(newMessage)

                processedCreatures = outputCreatures
                processedCreaturesRival = outputCreaturesrival

                if (!processedCreaturesRival[indexActualCreatureRival].dead) {
                    newAction = {
                        action: PLAYER_ACTIONS.ATTACK,
                        param: randomAttackIndex,
                        rival: true
                    }
                } else {
                    newAction = {
                        action: PLAYER_ACTIONS.DEAD,
                        param: null,
                        rival: true
                    }
                }

            } else {
                const [outputCreatures2, outputCreaturesrival2,
                    newMessage2
                ] = processAttack(randomAttackIndex, playerCreatures, rivalCreatures, false)
                setMessage(newMessage2)

                processedCreatures = outputCreatures2
                processedCreaturesRival = outputCreaturesrival2

                if (!processedCreatures[indexActualCreaturePlayer].dead) {
                    newAction = {
                        action: PLAYER_ACTIONS.ATTACK,
                        param: index,
                        rival: false
                    }
                } else {
                    newAction = {
                        action: PLAYER_ACTIONS.DEAD,
                        param: null,
                        rival: false
                    }
                }
            }
        } else if (playerAction.action == PLAYER_ACTIONS.CHANGE) {
            setMessage(
                {
                    name: "change",
                    vars: {
                        "player": player.name
                    }
                }
            )

            if (playerAction.param != INIT_STATES.FORCED_CHANGE) {
                const randomAttackIndex = getRandomInt(rivalCreature.attacks.length)
                newAction = {
                    action: PLAYER_ACTIONS.ATTACK,
                    param: randomAttackIndex,
                    rival: true
                }
            }
        }

        setNextAction(newAction)
    }, [])

    const handleContinueClick = (action) => {
        if (nextAction != null) {
            let newAction = null

            if (action.action == PLAYER_ACTIONS.ATTACK) {
                if (action.rival) {
                    const [outputCreatures2, ,
                        newMessage2
                    ] = processAttack(action.param, playerCreatures, rivalCreatures, false)
                    setMessage(newMessage2)

                    if (outputCreatures2[indexActualCreaturePlayer].dead) {
                        newAction = {
                            action: PLAYER_ACTIONS.DEAD,
                            param: null,
                            rival: false
                        }
                    }
                } else {
                    const [, outputCreaturesrival,
                        newMessage
                    ] = processAttack(action.param, playerCreatures, rivalCreatures, true)
                    setMessage(newMessage)

                    if (outputCreaturesrival[indexActualCreatureRival].dead) {
                        newAction = {
                            action: PLAYER_ACTIONS.DEAD,
                            param: null,
                            rival: true
                        }
                    }
                }
            } else if (action.action == PLAYER_ACTIONS.DEAD) {
                const playerName = action.rival ? rival.name : player.name
                const isplayer1 = action.rival ? false : true

                setMessage({
                    name: "isDead",
                    vars: {
                        "player": playerName,
                        "isplayer1": isplayer1
                    }
                })

                if (action.rival && rival.liveCreatures > 0) {
                    newAction = {
                        action: PLAYER_ACTIONS.CHANGE,
                        param: INIT_STATES.FORCED_CHANGE,
                        rival: true
                    }
                }
            } else if (action.action == PLAYER_ACTIONS.CHANGE) {
                const playerName = action.rival ? rival.name : player.name
                const newIndexCreature = deadFilterChoose(rivalCreatures)

                if (newIndexCreature !== null) {
                    setIndexActualCreatureRival(newIndexCreature)

                    setMessage({
                        name: "change",
                        vars: {
                            "player": playerName
                        }
                    })
                }

            }

            setNextAction(newAction)
        }
        else if (gameState == GAME_STATES.LOSE)
            changeWindow(WINDOW_NAMES.LOSE_GAME)
        else if (gameState == GAME_STATES.WIN)
            changeWindow(WINDOW_NAMES.WIN_OPTIONS)
        else if (message.name == 'isDead' && message.vars.isplayer1) {
            setInitWindow(INIT_STATES.DEAD)
            changeWindow(WINDOW_NAMES.CREATURES_BACKPACK)
        }
        else setMenu(0)
    }

    if (message && message.vars && message.vars.attackName) {
        message.vars.attack = langA[message.vars.attackName].name
    }

    return (
        <>
            <div className='messageContainer'>
                <div className='battleMessage'>
                    {message &&
                        applyMessageVars(langM[message.name],
                            message.vars
                        )
                    }
                </div>
                <div className='continue'
                    onClick={() => { handleContinueClick(nextAction) }}
                >
                    <b>{langM.continue}</b>
                </div>
            </div>
        </>
    )
}

BattleMessage.propTypes = {
    setMenu: PropTypes.func.isRequired,
    playerAction: PropTypes.object.isRequired
}