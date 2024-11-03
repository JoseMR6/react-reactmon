import { useGame } from '../Logic/hooks/useGame'
import { MAX_STAT_VALUE } from '../Logic/constants'
import './ViewStats.css'
import { PropTypes } from 'prop-types'

export function ViewStats({ stats }) {
    const {languajeDocument} = useGame()
    const statsList = Object.keys(stats)

    const lang=languajeDocument.StatsText

    return (
        <>
            <ul className='statsContainer'>
                {statsList.map((statName, index) => {
                    return (
                        <li key={index} className='statInfo'>
                            <div className='textContainer'>
                                <span ><b>{lang[statName]}</b>:</span>
                                <span >{stats[statName]}/{MAX_STAT_VALUE}</span>
                            </div>
                            <meter className='statBar'
                                value={stats[statName]} min="0"
                                max={MAX_STAT_VALUE}
                            />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

ViewStats.propTypes = {
    stats: PropTypes.object.isRequired
}