import { useGame } from '../Controller/hooks/useGame'
import { Creature } from '../Model/Creature'
import { Player } from '../Model/Player'
import { GAME_STATES, ITEM_TYPES, WEAK_TYPE_OF, PLAYER_SKINS, WINDOW_NAMES } from '../Model/constants'
import './ChooseCreature.css'
import { ElemntIcon } from './Types'
import { CreatureImg } from './creatures/CreatureImg'
import { PropTypes } from 'prop-types'

export function ChooseCreature() {
    const { languajeDocument, chooseOptions } = useGame()
    const lang = languajeDocument.ChooseCreature

    let creatures = []

    if (chooseOptions.length < 3) {
        creatures = [
            new Creature(),
            new Creature(),
            new Creature()
        ]
    } else {
        chooseOptions.forEach(option => {
            creatures.push(option)
        });
    }

    return (
        <>
            <div className="chooseCreatureContainer">
                <h1>{lang.title}</h1>
                <div className='creaturesContainer'>
                    <CreatureSelect creature={creatures[0]} />
                    <CreatureSelect creature={creatures[1]} />
                    <CreatureSelect creature={creatures[2]} />
                </div>
            </div>
        </>
    )
}

function CreatureSelect({ creature }) {
    const { languajeDocument, changeWindow, setSelectedItem,
        setPlayerCreatures, setGameState,round,setRound,setRival,
        setRivalCreatures,getNewId
    } = useGame()
    const lang = languajeDocument.ChooseCreature

    return (
        <>
            <div className='creatureContainer'>

                <div className='imgCreature'>
                    <CreatureImg
                        name={creature.image.name}
                        type={creature.type}
                        dark={creature.image.dark}
                    />
                </div>

                <div className='creatureSection'>
                    <ElemntIcon type={creature.type} />
                    <div className='options'>
                        <div className='buttonOption'
                            onClick={() => {
                                setPlayerCreatures([creature])
                                setRound(round + 1)
                                setRival(new Player(
                                    'Kenny',
                                    PLAYER_SKINS[0],
                                    1
                                ))
                                setRivalCreatures([
                                    Creature.generateCreature({
                                        id: getNewId(),
                                        type: WEAK_TYPE_OF[creature.type],
                                        numAttacks: 2
                                    })
                                ])
                                setGameState(GAME_STATES.BATTLE)
                                changeWindow(WINDOW_NAMES.BATTLE_PREVIEW)
                            }}
                        >
                            <b>{lang.selectButton}</b>
                        </div>
                        <div className='buttonOption'
                            onClick={() => {
                                const newSelected = {
                                    itemType: ITEM_TYPES.CREATURE,
                                    item: creature
                                }
                                setSelectedItem(newSelected)
                                changeWindow(WINDOW_NAMES.VIEW_CREATURE)
                            }}
                        >
                            <b>{lang.viewButton}</b>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

CreatureSelect.propTypes = {
    creature: PropTypes.object.isRequired
}