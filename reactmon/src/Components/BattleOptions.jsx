import { createElement, useEffect, useState } from 'react'
import { useGame } from '../Logic/hooks/useGame'
import { ATTACK_CATEGORYS, GAME_STATES, INIT_STATES, PLAYER_ACTIONS, PLAYER_CREATURE_EXAMPLE, RIVAL_CREATURE_EXAMPLE, WINDOW_NAMES } from '../Logic/constants'
import './BattleOptions.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'
import { applyMessageVars, getCategoryRoute } from '../Logic/functions/parse'
import { getRandomInt } from '../Logic/functions/calculations'
import { deadFilterChoose, getFirst } from '../Logic/functions/creature'
import battle from '../assets/options/battle.svg'
import change from '../assets/options/change.svg'
import surrender from '../assets/options/surrender.svg'
import { Buff } from './animations_img/Buff'
import { PhAttack } from './animations_img/PhAttack'
import { SpAttack } from './animations_img/SpAttack'
import buffSound from '../assets/sounds/buff.wav'
import phAttackSound from '../assets/sounds/phAttack.wav'
import spAttackSound from '../assets/sounds/spAttack.wav'

export function BattleOptions() {
    const { playerCreatures, rivalCreatures, indexActualCreaturePlayer,
        indexActualCreatureRival, initWindow, player, setPlayer, rival, setRival,
        setInitWindow, battleOptions, mute, volume
    } = useGame()

    const initialAnimation = { name: null, elemType: null, rival: null }

    const [menu, setMenu] = useState(0)
    const [playerAction, setPlayerAction] = useState({ action: null, param: null })
    const [animation, setAnimation] = useState(initialAnimation)

    const localPlayerCreature = playerCreatures
        ? playerCreatures[indexActualCreaturePlayer]
        : PLAYER_CREATURE_EXAMPLE

    const localRivalCreature = rivalCreatures
        ? rivalCreatures[indexActualCreatureRival]
        : RIVAL_CREATURE_EXAMPLE

    useEffect(() => {
        if (initWindow == WINDOW_NAMES.BATTLE_OPTIONS) {
            const modPlayer = structuredClone(player)
            modPlayer.liveCreatures = 0
            playerCreatures.forEach(creature => {
                if (!creature.dead) modPlayer.liveCreatures++
            })
            setPlayer(modPlayer)
            const modRival = structuredClone(rival)
            modRival.liveCreatures = rivalCreatures.length
            setRival(modRival)

            battleOptions.current = {}
            setInitWindow(null)
        } else if (initWindow == INIT_STATES.CHANGE || initWindow == INIT_STATES.FORCED_CHANGE) {
            battleOptions.current.playerAction = { action: PLAYER_ACTIONS.CHANGE, param: initWindow }
            setPlayerAction(battleOptions.current.playerAction)
            setInitWindow(null)
            battleOptions.current.menu = 2
            setMenu(battleOptions.current.menu)
        }

        if (battleOptions.current) {
            const boMenu = battleOptions.current.menu
            if (boMenu)
                setMenu(boMenu)
        }
    }, []);

    const duration = 0.5  //seconds

    const doAnimation = (name, elemType, rival) => {
        const colorFilter = {
            fire: "invert(82%) sepia(12%) saturate(5929%) hue-rotate(325deg) brightness(105%) contrast(97%)",
            grass: "invert(63%) sepia(39%) saturate(602%) hue-rotate(68deg) brightness(96%) contrast(90%)",
            water: "invert(54%) sepia(88%) saturate(329%) hue-rotate(168deg) brightness(90%) contrast(93%)",
            neutral: "invert(67%) sepia(7%) saturate(83%) hue-rotate(56deg) brightness(95%) contrast(90%)"
        }

        let component = 'div'

        if (name == ATTACK_CATEGORYS.SUPPORT) {
            component = Buff
        } else if (name == ATTACK_CATEGORYS.PHYSICAL) {
            component = PhAttack
        } else if (name == ATTACK_CATEGORYS.SPECIAL) {
            component = SpAttack
        }

        if (component == 'div') {
            const style = {
                visibility: "hidden",
                animation: "none"
            }
            return createElement(component, { style: style })
        } else {
            return createElement(component, {
                duration: duration, colorFilter: colorFilter[elemType], rival: rival
            })
        }

    }

    const doSound = (name)=>{
        let sound = null

        if (name == ATTACK_CATEGORYS.SUPPORT) {
            sound = new Audio(buffSound)
        } else if (name == ATTACK_CATEGORYS.PHYSICAL) {
            sound = new Audio(phAttackSound)
        } else if (name == ATTACK_CATEGORYS.SPECIAL) {
            sound = new Audio(spAttackSound)
        }

        sound.volume=volume
        sound.muted=mute
        sound.play()
    }

    const startAnimation = async (animation) => {
        setAnimation(animation)
        setTimeout(() => {
            setAnimation(initialAnimation)
        }, (duration * 1100))
        
        doSound(animation.name)
    }

    return (
        <>
            <div className='generalBattleContainer'>
                <div className='battleContainer'>
                    {
                        doAnimation(animation.name, animation.elemType, animation.rival)
                        //doAnimation(ANIMATIONS.SP_ATTACK,ELEMENTAL_TYPES.FIRE,true)
                    }
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
                            startAnimation={startAnimation}
                        />
                    }
                </div>
            </div>

        </>
    )
}

function PlayerCreatureContainer({ player, main = true }) {
    const { background } = useGame()
    const ground = background.color.slice(0, -2)

    return (
        <>
            <div className={'playerCreatureContainer ' + (!main ? 'rival' : '')}>
                <div className='battleGround' style={{ backgroundColor: ground }} />
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
                                    src={getCategoryRoute(ATTACK_CATEGORYS.SUPPORT)}
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
    const { languajeDocument, setGameState, changeWindow,
        battleOptions } = useGame()
    const lang = languajeDocument.BattleOptions

    return (
        <>
            <div className='option'
                onClick={() => {
                    battleOptions.current.menu = 1
                    setMenu(battleOptions.current.menu)
                }}
            >
                <span><b>{lang.attackButton}</b></span>
                <img className='attack'
                    src={battle}
                />
            </div>
            <div className='option'
                onClick={() => {
                    changeWindow(WINDOW_NAMES.CREATURES_BACKPACK)
                }}
            >
                <span><b>{lang.changeButton}</b></span>
                <img className='change'
                    src={change}
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
                    src={surrender}
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
        indexActualCreaturePlayer, battleOptions
    } = useGame()
    const lang = languajeDocument.BattleOptions
    const langA = languajeDocument.AttacksText

    const creature = structuredClone(playerCreatures[indexActualCreaturePlayer])

    const handleAttackClick = (index) => {
        battleOptions.current.playerAction = { action: PLAYER_ACTIONS.ATTACK, param: index }
        setPlayerAction(battleOptions.current.playerAction)
        battleOptions.current.menu = 2
        setMenu(battleOptions.current.menu)
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
                                src={getCategoryRoute(attack.category)}
                            />
                            <ElemntIcon type={attack.type} />
                        </div>
                    </div>
                )
            })}

            <div className='option'
                onClick={() => {
                    battleOptions.current.menu = 0
                    setMenu(battleOptions.current.menu)
                }}
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

function BattleMessage({ setMenu, playerAction, startAnimation }) {
    const { gameState, changeWindow, languajeDocument, setInitWindow,
        playerCreatures, rivalCreatures, indexActualCreaturePlayer, indexActualCreatureRival,
        processAttack, player, rival, setIndexActualCreatureRival, battleOptions
    } = useGame()
    const [message, setMessage] = useState(null)
    const [nextAction, setNextAction] = useState(null)
    const langM = languajeDocument.BattleMessages
    const langA = languajeDocument.AttacksText

    useEffect(() => {
        if (playerAction && playerAction.action != null) {
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
                    const isRivalAction = false

                    const [outputCreatures, outputCreaturesrival,
                        newMessage
                    ] = processAttack(index, playerCreatures, rivalCreatures, !isRivalAction)
                    battleOptions.current.message = newMessage
                    setMessage(battleOptions.current.message)

                    startAnimation({
                        name: creature.attacks[index].category,
                        elemType: creature.attacks[index].type,
                        rival: isRivalAction
                    })

                    processedCreatures = outputCreatures
                    processedCreaturesRival = outputCreaturesrival

                    if (!processedCreaturesRival[indexActualCreatureRival].dead) {
                        newAction = {
                            action: PLAYER_ACTIONS.ATTACK,
                            param: randomAttackIndex,
                            rival: !isRivalAction
                        }
                    } else {
                        newAction = {
                            action: PLAYER_ACTIONS.DEAD,
                            param: null,
                            rival: !isRivalAction
                        }
                    }

                } else {
                    const isRivalAction = true

                    const [outputCreatures2, outputCreaturesrival2,
                        newMessage2
                    ] = processAttack(randomAttackIndex, playerCreatures, rivalCreatures, !isRivalAction)
                    battleOptions.current.message = newMessage2
                    setMessage(battleOptions.current.message)

                    startAnimation({
                        name: rivalCreature.attacks[randomAttackIndex].category,
                        elemType: rivalCreature.attacks[randomAttackIndex].type,
                        rival: isRivalAction
                    })

                    processedCreatures = outputCreatures2
                    processedCreaturesRival = outputCreaturesrival2

                    if (!processedCreatures[indexActualCreaturePlayer].dead) {
                        newAction = {
                            action: PLAYER_ACTIONS.ATTACK,
                            param: index,
                            rival: !isRivalAction
                        }
                    } else {
                        newAction = {
                            action: PLAYER_ACTIONS.DEAD,
                            param: null,
                            rival: !isRivalAction
                        }
                    }
                }
            } else if (playerAction.action == PLAYER_ACTIONS.CHANGE) {
                battleOptions.current.message = {
                    name: "change",
                    vars: {
                        "player": player.name
                    }
                }
                setMessage(battleOptions.current.message)

                if (playerAction.param != INIT_STATES.FORCED_CHANGE) {
                    const randomAttackIndex = getRandomInt(rivalCreature.attacks.length)
                    newAction = {
                        action: PLAYER_ACTIONS.ATTACK,
                        param: randomAttackIndex,
                        rival: true
                    }
                }
            }

            battleOptions.current.nextAction = newAction
            setNextAction(battleOptions.current.nextAction)
        }

        if (battleOptions.current) {
            const boMessage = battleOptions.current.message
            const boNextAction = battleOptions.current.nextAction
            if (boMessage)
                setMessage(boMessage)
            if (boNextAction)
                setNextAction(boNextAction)
        }
    }, [])

    const handleContinueClick = (action) => {
        if (action != null) {
            let newAction = null

            const creature = structuredClone(playerCreatures[indexActualCreaturePlayer])
            const rivalCreature = structuredClone(rivalCreatures[indexActualCreatureRival])

            if (action.action == PLAYER_ACTIONS.ATTACK) {
                if (action.rival) {
                    const [outputCreatures2, ,
                        newMessage2
                    ] = processAttack(action.param, playerCreatures, rivalCreatures, !action.rival)
                    battleOptions.current.message = newMessage2
                    setMessage(battleOptions.current.message)

                    startAnimation({
                        name: rivalCreature.attacks[action.param].category,
                        elemType: rivalCreature.attacks[action.param].type,
                        rival: action.rival
                    })

                    if (outputCreatures2[indexActualCreaturePlayer].dead) {
                        newAction = {
                            action: PLAYER_ACTIONS.DEAD,
                            param: null,
                            rival: !action.rival
                        }
                    }
                } else {
                    const [, outputCreaturesrival,
                        newMessage
                    ] = processAttack(action.param, playerCreatures, rivalCreatures, !action.rival)
                    battleOptions.current.message = newMessage
                    setMessage(battleOptions.current.message)

                    startAnimation({
                        name: creature.attacks[action.param].category,
                        elemType: creature.attacks[action.param].type,
                        rival: action.rival
                    })

                    if (outputCreaturesrival[indexActualCreatureRival].dead) {
                        newAction = {
                            action: PLAYER_ACTIONS.DEAD,
                            param: null,
                            rival: !action.rival
                        }
                    }
                }
            } else if (action.action == PLAYER_ACTIONS.DEAD) {
                const playerName = action.rival ? rival.name : player.name
                const isplayer1 = action.rival ? false : true

                battleOptions.current.message = {
                    name: "isDead",
                    vars: {
                        "player": playerName,
                        "isplayer1": isplayer1
                    }
                }
                setMessage(battleOptions.current.message)

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

                    battleOptions.current.message = {
                        name: "change",
                        vars: {
                            "player": playerName
                        }
                    }
                    setMessage(battleOptions.current.message)
                }

            }

            battleOptions.current.nextAction = newAction
            setNextAction(battleOptions.current.nextAction)
        }
        else if (gameState == GAME_STATES.LOSE)
            changeWindow(WINDOW_NAMES.LOSE_GAME)
        else if (gameState == GAME_STATES.WIN) {
            setInitWindow(WINDOW_NAMES.WIN_OPTIONS)
            changeWindow(WINDOW_NAMES.WIN_OPTIONS)
        } else if (message.name == 'isDead' && message.vars.isplayer1) {
            setInitWindow(INIT_STATES.DEAD)
            changeWindow(WINDOW_NAMES.CREATURES_BACKPACK)
        } else {
            battleOptions.current.menu = 0
            setMenu(battleOptions.current.menu)
        }
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
    playerAction: PropTypes.object.isRequired,
    startAnimation: PropTypes.func.isRequired
}