import { useEffect, useState } from 'react'
import { useGame } from '../Controller/hooks/useGame'
import { ATTACKS, ATTACK_CATEGORYS, BUFF_LAYER_MAX, CREATURES, ELEMENTAL_TYPES, STAT_NAMES, WINDOW_NAMES } from '../Model/constants'
import './BattleOptions.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'
import { Creature } from '../Model/Creature'

export function BattleOptions() {
    const { playerCreatures, rivalCreatures, indexActualCreaturePlayer,
        indexActualCreatureRival, healthActualCreaturePlayer,
        healthActualCreatureRival, buffsActualCreaturePlayer,
        buffsActualCreatureRival, initWindow, setInitWindow,
        setHealthActualCreaturePlayer,
        setBuffsActualCreaturePlayer, setHealthActualCreatureRival,
        setBuffsActualCreatureRival
    } = useGame()

    const [menu, setMenu] = useState(0)

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
            setHealthActualCreaturePlayer(
                localPlayerCreature.recordedHealth
            )
            setBuffsActualCreaturePlayer({ cont: 0, stat: null })
            setHealthActualCreatureRival(
                localRivalCreature.recordedHealth
            )
            setBuffsActualCreatureRival({ cont: 0, stat: null })
            setInitWindow(null)
        } else {
            if (!playerCreatures || playerCreatures.length == 0) {
                setHealthActualCreaturePlayer(localPlayerCreature.recordedHealth)
                setBuffsActualCreaturePlayer({ cont: 1, stat: STAT_NAMES.PH_ATTACK })
            }

            if (!rivalCreatures || rivalCreatures.length == 0) {
                setHealthActualCreatureRival(localRivalCreature.recordedHealth)
                setBuffsActualCreatureRival({ cont: 1, stat: STAT_NAMES.SP_DEFENSE })
            }

        }
    }, []);

    return (
        <>

            <div className='generalBattleContainer'>

                <div className='battleContainer'>
                    {(healthActualCreaturePlayer !== null
                        && buffsActualCreaturePlayer !== null
                        && healthActualCreatureRival !== null
                        && buffsActualCreatureRival !== null
                    )
                        &&
                        <>
                            <PlayerCreatureContainer
                                player={localPlayerCreature}
                                health={healthActualCreaturePlayer}
                            />
                            <PlayerCreatureContainer
                                player={localRivalCreature}
                                health={healthActualCreatureRival}
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
                        <AttackOptions creature={localPlayerCreature}
                            rivalCreature={localRivalCreature}
                            setMenu={setMenu}
                        />
                    }

                </div>
            </div>

        </>
    )
}

export function PlayerCreatureContainer({ player, health, main = true }) {
    const { buffsActualCreaturePlayer, buffsActualCreatureRival } = useGame()

    const buffs = main ? buffsActualCreaturePlayer : buffsActualCreatureRival

    console.log('holi')

    return (
        <>
            <div className={'playerCreatureContainer ' + (!main ? 'rival' : '')}>
                <div className='battleGround' />
                <div className='healthContainer'>
                    <meter className='healthBar'
                        value={health} min="0"
                        max={player.stats.maxHealth}
                    />
                    {main &&
                        <span>{health}
                            /{player.stats.maxHealth}
                        </span>
                    }

                </div>
                <div className='imgsContainer'>
                    <div className='iconsContainer'>
                        <ElemntIcon type={player.type} />
                        {buffs.cont > 0 &&
                            <div className='buffContainer'>
                                <img className={'category ' + ATTACK_CATEGORYS.SUPPORT}
                                    src={'./src/assets/categories/' + ATTACK_CATEGORYS.SUPPORT + '.svg'}
                                />
                                <div className='buffCount'>
                                    {
                                        main
                                            ? buffsActualCreaturePlayer.cont
                                            : buffsActualCreatureRival.cont
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
    health: PropTypes.number.isRequired,
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

function AttackOptions({ creature, rivalCreature, setMenu }) {
    const { languajeDocument,
        buffsActualCreaturePlayer, buffsActualCreatureRival,
        healthActualCreatureRival, setHealthActualCreatureRival,
        healthActualCreaturePlayer, setHealthActualCreaturePlayer,
        setBuffsActualCreaturePlayer, setBuffsActualCreatureRival
    } = useGame()
    const lang = languajeDocument.BattleOptions
    const langA = languajeDocument.AttacksText

    const doAttack = (indexAttack, creaturePlayer, creatureRival, buffsPlayer,
        BuffsRival, healthRival, setHealthRival, healthPlayer, setHealthPlayer,
        setBuffsPlayer
    ) => {
        const attack = creaturePlayer.attacks[indexAttack]
        if (attack.category == ATTACK_CATEGORYS.PHYSICAL
            || attack.category == ATTACK_CATEGORYS.SPECIAL
        ) {
            let damage = creaturePlayer.getAttackDamage(
                indexAttack, creatureRival, buffsPlayer,
                BuffsRival
            )

            console.log("damage " + damage)
            let health = healthRival - damage
            if (health < 0) health = 0
            setHealthRival(health)
        } else if (attack.category == ATTACK_CATEGORYS.SUPPORT) {
            //console.log(buffsPlayer)

            //Curacion
            if (attack.name == 'Absorption') {
                let heal = healthPlayer + creaturePlayer.getHeal()
                console.log("curacion " + heal)
                if (heal > creaturePlayer.stats.maxHealth) heal = creaturePlayer.stats.maxHealth
                const healSet = heal
                setHealthPlayer(healSet)
            }

            //velocidad
            if (attack.name == 'Doping') {
                let buff = { cont: 0, stat: STAT_NAMES.SPEED }
                if (buffsPlayer.stat == buff.stat) buff = buffsPlayer
                if (buff.cont + 1 <= BUFF_LAYER_MAX) buff.cont++
                const buffSet = buff
                setBuffsPlayer(buffSet)
            }

            //Ataque fisico
            if (attack.name == 'ThermalSharpening') {
                let buff = { cont: 0, stat: STAT_NAMES.PH_ATTACK }
                if (buffsPlayer.stat == buff.stat) buff = buffsPlayer
                if (buff.cont + 1 <= BUFF_LAYER_MAX) buff.cont++
                const buffSet = buff
                setBuffsPlayer(buffSet)
            }
            //Ataque especial
            if (attack.name == 'Ignition') {
                let buff = { cont: 0, stat: STAT_NAMES.SP_ATTACK }
                if (buffsPlayer.stat == buff.stat) buff = buffsPlayer
                if (buff.cont + 1 <= BUFF_LAYER_MAX) buff.cont++
                const buffSet = buff
                setBuffsPlayer(buffSet)
            }

            //Defensa fisica
            if (attack.name == 'FrozenShield') {
                let buff = { cont: 0, stat: STAT_NAMES.PH_DEFENSE }
                if (buffsPlayer.stat == buff.stat) buff = buffsPlayer
                if (buff.cont + 1 <= BUFF_LAYER_MAX) buff.cont++
                const buffSet = buff
                setBuffsPlayer(buffSet)
            }
            //Defensa especial
            if (attack.name == 'AquaticAura') {
                let buff = { cont: 0, stat: STAT_NAMES.SP_DEFENSE }
                if (buffsPlayer.stat == buff.stat) buff = buffsPlayer
                if (buff.cont + 1 <= BUFF_LAYER_MAX) buff.cont++
                const buffSet = buff
                setBuffsPlayer(buffSet)
            }
            console.log(attack.name)
            console.log(buffsPlayer)
        }

    }

    return (
        <>
            {creature.attacks.map((attack, index) => {
                return (
                    <div key={index} className='option'
                        onClick={() => {
                            const playerFirst = creature.getFirst(
                                rivalCreature, buffsActualCreaturePlayer,
                                buffsActualCreatureRival
                            )

                            let randomAttackIndex = Math.floor(Math.random() * rivalCreature.attacks.length)

                            if (playerFirst) {
                                doAttack(index, creature, rivalCreature,
                                    buffsActualCreaturePlayer,
                                    buffsActualCreatureRival,
                                    healthActualCreatureRival,
                                    setHealthActualCreatureRival,
                                    healthActualCreaturePlayer,
                                    setHealthActualCreaturePlayer,
                                    setBuffsActualCreaturePlayer
                                )
                                doAttack(randomAttackIndex, rivalCreature, creature,
                                    buffsActualCreatureRival,
                                    buffsActualCreaturePlayer,
                                    healthActualCreaturePlayer,
                                    setHealthActualCreaturePlayer,
                                    healthActualCreatureRival,
                                    setHealthActualCreatureRival,
                                    setBuffsActualCreatureRival
                                )
                            } else {
                                doAttack(randomAttackIndex, rivalCreature, creature,
                                    buffsActualCreatureRival,
                                    buffsActualCreaturePlayer,
                                    healthActualCreaturePlayer,
                                    setHealthActualCreaturePlayer,
                                    healthActualCreatureRival,
                                    setHealthActualCreatureRival,
                                    setBuffsActualCreatureRival
                                )
                                doAttack(index, creature, rivalCreature,
                                    buffsActualCreaturePlayer,
                                    buffsActualCreatureRival,
                                    healthActualCreatureRival,
                                    setHealthActualCreatureRival,
                                    healthActualCreaturePlayer,
                                    setHealthActualCreaturePlayer,
                                    setBuffsActualCreaturePlayer
                                )
                            }

                            console.log(creature)
                            console.log(rivalCreature)
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
    creature: PropTypes.object.isRequired,
    rivalCreature: PropTypes.object.isRequired,
    setMenu: PropTypes.func.isRequired
}