import { getSkinRoute } from '../Controller/functions/skins'
import { useGame } from '../Controller/hooks/useGame'
import { Creature } from '../Model/Creature'
import { Player } from '../Model/Player'
import { CREATURES, ELEMENTAL_TYPES, PLAYER_SKINS, WINDOW_NAMES } from '../Model/constants'
import './BattlePreview.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'

export function BattlePreview() {
    const { rival, rivalCreatures, player, playerCreatures,
        languajeDocument
    } = useGame()

    const lang = languajeDocument.BattlePreview

    let localPlayer = player
    let localPlayerCreatures = playerCreatures
    let localRival = rival
    let localRivalCreatures = rivalCreatures

    if (!player || player.name == "") {
        localPlayer = new Player(
            'Jhon',
            PLAYER_SKINS[0],
            0
        )
    }
    if (!playerCreatures) {
        const creature = new Creature(0,
            { name: CREATURES[0].name, dark: 0 }, ELEMENTAL_TYPES.FIRE)
        localPlayerCreatures = [
            creature, creature, creature, creature, creature, creature
        ]
    }

    if (!rival) {
        localRival = new Player(
            'Kenny',
            PLAYER_SKINS[1],
            1
        )
    }
    if (!rivalCreatures) {
        const creature = new Creature(1,
            { name: CREATURES[1].name, dark: 6 }, ELEMENTAL_TYPES.GRASS)
        localRivalCreatures = [
            creature, creature, creature, creature, creature, creature
        ]
    }

    return (
        <>
            <div className='previewContainer'>
                <h2>{lang.title}</h2>
                <div className='playersContainer'>
                    <PlayerPreview
                        player={localPlayer}
                        playerCreatures={localPlayerCreatures}
                    />
                    <PlayerPreview
                        player={localRival}
                        playerCreatures={localRivalCreatures}
                        selected={true}
                    />
                </div>
            </div>

        </>
    )
}

function PlayerPreview({ player, playerCreatures, selected = false }) {
    const { languajeDocument, changeWindow, setIndexActualCreaturePlayer,
        setIndexActualCreatureRival, rivalCreatures, 
        setHealthActualCreaturePlayer, setHealthActualCreatureRival,
        setBuffsActualCreaturePlayer,setBuffsActualCreatureRival
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
                                        setHealthActualCreaturePlayer(
                                            creature.recordedHealth
                                        )
                                        setBuffsActualCreaturePlayer(0)
                                        const randomIndex = Math.floor(Math.random()*(rivalCreatures.length))
                                        setIndexActualCreatureRival(randomIndex)
                                        setHealthActualCreatureRival(
                                            rivalCreatures[randomIndex].recordedHealth
                                        )
                                        setBuffsActualCreatureRival(0)
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