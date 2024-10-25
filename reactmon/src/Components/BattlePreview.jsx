import { useEffect, } from 'react'
import { getSkinRoute } from '../Logic/functions/skins'
import { useGame } from '../Logic/hooks/useGame'
import { Creature } from '../Logic/classes/Creature'
import { Player } from '../Logic/classes/Player'
import { CREATURES, ELEMENTAL_TYPES, PLAYER_SKINS, WEAK_TYPE_OF, WINDOW_NAMES } from '../Logic/constants'
import './BattlePreview.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'

export function BattlePreview() {
    const { rival, rivalCreatures, player, setPlayer, playerCreatures, setPlayerCreatures,
        languajeDocument, initWindow,setInitWindow, setRival, setRivalCreatures, setRound, round,
        getNewId
    } = useGame()

    const lang = languajeDocument.BattlePreview

    useEffect(() => {
        if (initWindow == WINDOW_NAMES.BATTLE_PREVIEW) {
            setRound(round + 1)

            const { newRival,
                newRivalCreatures
            } = Player.generateRival(
                round, getNewId, WEAK_TYPE_OF[playerCreatures[0].type]
            )

            setRival(newRival)
            setRivalCreatures(newRivalCreatures)
            setInitWindow(null)
        } else {
            if (!player)
                setPlayer(new Player(
                    'Jhon',
                    PLAYER_SKINS[0],
                    0
                ))
            if (!rival)
                setRival(new Player(
                    'Kenny',
                    PLAYER_SKINS[1],
                    1
                ))
            const defaultCreature = new Creature(
                0,
                { name: CREATURES[0].name, dark: 0 },
                ELEMENTAL_TYPES.FIRE
            )
            const defaultRivalCreature = new Creature(
                1,
                { name: CREATURES[1].name, dark: 6 },
                ELEMENTAL_TYPES.GRASS
            )
            if (!playerCreatures || playerCreatures.length == 0)
                setPlayerCreatures([
                    defaultCreature, defaultCreature, defaultCreature,
                    defaultCreature, defaultCreature, defaultCreature
                ])
            if (rivalCreatures || rivalCreatures.length == 0)
                setRivalCreatures([
                    defaultRivalCreature, defaultRivalCreature, defaultRivalCreature,
                    defaultRivalCreature, defaultRivalCreature, defaultRivalCreature
                ])
        }
    }, []);

    return (
        <>
            {(player && playerCreatures && rival && rivalCreatures) &&
                <div className='previewContainer'>
                    <h2>{lang.title}</h2>
                    <div className='playersContainer'>
                        <PlayerPreview
                            player={player}
                            playerCreatures={playerCreatures}
                        />
                        <PlayerPreview
                            player={rival}
                            playerCreatures={rivalCreatures}
                            selected={true}
                        />
                    </div>
                </div>
            }
        </>
    )
}

function PlayerPreview({ player, playerCreatures, selected = false }) {
    const { languajeDocument, changeWindow, setIndexActualCreaturePlayer,
        setIndexActualCreatureRival, rivalCreatures,
        setInitWindow
    } = useGame()
    const lang = languajeDocument.BattlePreview

    return (
        <>
            <div className={'playerContainer ' + (selected ? 'selected' : '')}>
                <div className='playerInfoContainer'>
                    <img src={getSkinRoute(player.image)} />
                    <div className='playerInfo'>
                        <div className='playerName'>
                            <b>{player.name}</b>
                        </div>
                        <div className='recordContainer'>
                            <span><b>{lang.record}</b>:</span>
                            <span>{player.record}</span>
                        </div>
                    </div>
                </div>
                <div className='creaturesInfo'>
                    {playerCreatures.map((creature, index) => {
                        return (
                            <div key={index} className='creatureInfo'
                                onClick={() => {
                                    if (!selected) {
                                        setIndexActualCreaturePlayer(index)
                                        const randomIndex = Math.floor(Math.random() * (rivalCreatures.length))
                                        setIndexActualCreatureRival(randomIndex)
                                        setInitWindow(WINDOW_NAMES.BATTLE_OPTIONS)
                                        changeWindow(WINDOW_NAMES.BATTLE_OPTIONS)
                                    }
                                }}
                            >
                                <ElemntIcon type={creature.type} />
                                <CreatureImg
                                    name={creature.image.name}
                                    type={creature.type}
                                    dark={creature.image.dark}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

PlayerPreview.propTypes = {
    player: PropTypes.object.isRequired,
    playerCreatures: PropTypes.array.isRequired,
    selected: PropTypes.bool
}