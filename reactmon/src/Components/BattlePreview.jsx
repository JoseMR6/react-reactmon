import { useEffect, } from 'react'
import { getSkinRoute } from '../Logic/functions/parse'
import { useGame } from '../Logic/hooks/useGame'
import { PLAYER_CREATURES_EXAMPLE, PLAYER_EXAMPLE, RIVAL_CREATURES_EXAMPLE, RIVAL_EXAMPLE, ROUNDS_PER_STAGE, ROUND_FIRST_BOSS, WEAK_TYPE_OF, WINDOW_NAMES } from '../Logic/constants'
import './BattlePreview.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'
import { creatureReset } from '../Logic/functions/creature'
import { generateRival } from '../Logic/functions/player'
import { nextBackground } from '../Logic/functions/calculations'

export function BattlePreview() {
    const { rival, rivalCreatures, player, setPlayer, playerCreatures, setPlayerCreatures,
        languajeDocument, initWindow, setInitWindow, setRival, setRivalCreatures, setRound, round,
        getNewId, setBackground
    } = useGame()

    const lang = languajeDocument.BattlePreview

    useEffect(() => {
        if (initWindow == WINDOW_NAMES.BATTLE_PREVIEW) {
            const newRound=round + 1
            setRound(newRound)

            const playerCreaturesClone = []
            playerCreatures.forEach((creature) => {
                const creatureClone = structuredClone(creature)
                if(newRound<=ROUND_FIRST_BOSS || newRound%ROUNDS_PER_STAGE==0
                    || newRound%ROUNDS_PER_STAGE==1
                ){
                    creatureReset(creatureClone)
                }
                playerCreaturesClone.push(creatureClone)
            });
            setPlayerCreatures(playerCreaturesClone)

            if(newRound%ROUNDS_PER_STAGE==1){
                setBackground(nextBackground(round))
            }
            
            const { newRival,
                newRivalCreatures
            } = generateRival(
                newRound, getNewId, WEAK_TYPE_OF[playerCreatures[0].type]
            )

            setRival(newRival)
            setRivalCreatures(newRivalCreatures)
            setInitWindow(null)
        } else {
            if (!player)
                setPlayer(PLAYER_EXAMPLE)
            if (!rival)
                setRival(RIVAL_EXAMPLE)
            if (!playerCreatures || playerCreatures.length == 0)
                setPlayerCreatures(PLAYER_CREATURES_EXAMPLE)
            if (!rivalCreatures || rivalCreatures.length == 0)
                setRivalCreatures(RIVAL_CREATURES_EXAMPLE)
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

    const handleCreatureClick=(index)=>{
        if (!selected) {
            setIndexActualCreaturePlayer(index)
            const randomIndex = Math.floor(Math.random() * (rivalCreatures.length))
            setIndexActualCreatureRival(randomIndex)
            setInitWindow(WINDOW_NAMES.BATTLE_OPTIONS)
            changeWindow(WINDOW_NAMES.BATTLE_OPTIONS)
        }
    }

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
                            <div key={index} className={'creatureInfo '+(creature.dead?'selected':'')}
                                onClick={() => {if(!creature.dead)handleCreatureClick(index)}}
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