import { useEffect } from 'react'
import { getSkinRoute } from '../Logic/functions/skins'
import { useGame } from '../Logic/hooks/useGame'
import './LoseGame.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'

export function LoseGame() {
    const { player, round, setPlayer, playerCreatures, languajeDocument } = useGame()

    const lang=languajeDocument.LoseGame

    useEffect(() => {
        const clonePlayer = structuredClone(player)
        clonePlayer.record = (clonePlayer.record < round) ? round : clonePlayer.record
        setPlayer(clonePlayer)

        localStorage.setItem("reactmonPayer",JSON.stringify(clonePlayer))
    }, [])

    return (
        <>
            <div className='loseGameContainer'>
                <h1>{lang.title}</h1>
                <div className='generalPositionContainer'>
                    <div className='playerInfoContainer'>
                        <img src={getSkinRoute(player.image)}
                            alt={player.image}
                        />
                        <div><b>{player.name}</b></div>
                        <div className='playerStatsContainer'>
                            <div className='statContainer'>
                                <div><b>{lang.record}</b>:</div>
                                <div>{player.record}</div>
                            </div>
                            <div className='statContainer'>
                                <div><b>{lang.round}</b>:</div>
                                <div>{round}</div>
                            </div>
                        </div>
                    </div>
                    <div className='creaturesInfoContainer'>
                        <h3>{lang.finalTeam}</h3>
                        <div className='creaturesContainer'>
                            {playerCreatures.map((creature, index) => {
                                return (
                                    <div key={index} className='creatureContainer'>
                                        <div className='imgCreature'>
                                            <CreatureImg
                                                name={creature.image.name}
                                                type={creature.type}
                                                dark={creature.image.dark}
                                            />
                                        </div>
                                        <ElemntIcon type={creature.type} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}