import './Shop.css'
import { useGame } from '../Logic/hooks/useGame'
import { generateCreature, getCreaturePrice } from '../Logic/functions/creature'
import { PropTypes } from 'prop-types'
import { CreatureImg } from './creatures/CreatureImg'
import { ElemntIcon } from './Types'
import CoinIcon from '/coin.svg'
import Exit from '/exit.svg'
import resetIcon from '/reset.svg'
import backpack from '../assets/options/change.svg'
import { BACKGROUNDS, GAME_STATES, INIT_STATES, ITEM_TYPES, RARE_PERCENTAGE, REFRESH_PRICE, ULTRA_RARE_PERCENTAGE, WINDOW_NAMES } from '../Logic/constants'
import { getRandomInt } from '../Logic/functions/calculations'
import { useEffect } from 'react'

export function Shop() {
    const { chooseOptions, setChooseOptions, getNewId, initWindow, setInitWindow,
        setCoins, coins,setGameState,changeWindow, languajeDocument,
        setBackground, setCanSell
    } = useGame()

    const lang=languajeDocument.Shop

    const generateCreatures = () => {
        let maxedStatsNum=[0,0]
        
        maxedStatsNum.forEach((value,index)=>{
            let randomNumber=getRandomInt(100)+1
            if(randomNumber<=ULTRA_RARE_PERCENTAGE){
                maxedStatsNum[index]=2
            }else if(randomNumber<=(RARE_PERCENTAGE+ULTRA_RARE_PERCENTAGE)){
                maxedStatsNum[index]=1
            }
        })
        
        return [
            generateCreature({
                id: getNewId(),
                maxedStatsNum:maxedStatsNum[0]
            }),
            generateCreature({
                id: getNewId(),
                maxedStatsNum:maxedStatsNum[1]
            })
        ]
    }

    useEffect(() => {
        if (initWindow == WINDOW_NAMES.SHOP) {
            setBackground(BACKGROUNDS[BACKGROUNDS.length-1])
            setChooseOptions(generateCreatures())
            setCanSell(true)
            setInitWindow(null)
        }
    }, [])

    const handleRefreshClick = () => {
        const newCoins = coins - REFRESH_PRICE
        if (newCoins >= 0) {
            setChooseOptions(generateCreatures())
            setCoins(newCoins)
        }
    }

    const handleCreaturesClick = () => {
        changeWindow(WINDOW_NAMES.CREATURES_BACKPACK)
    }

    const handleExitClick=()=>{
        setInitWindow(WINDOW_NAMES.BATTLE_PREVIEW)
        setGameState(GAME_STATES.BATTLE)
        changeWindow(WINDOW_NAMES.BATTLE_PREVIEW)
    }

    return (
        <>
            {(chooseOptions && chooseOptions.length != 0) &&
                <div className="shopContainer">
                    <h1>{lang.title}</h1>
                    <div className='leftOptions'>
                        <div className='option'
                            onClick={handleRefreshClick}
                        >
                            <img src={resetIcon} className="imgOption" />
                            {REFRESH_PRICE}
                            <img src={CoinIcon} className="imgOption" />
                        </div>
                        <div className='option'
                            onClick={handleCreaturesClick}
                        >
                            <img src={backpack} className="imgOption" />
                            {lang.creaturesButton}
                        </div>
                    </div>
                    <div className='rightOptions'>
                        <div className='option'
                            onClick={handleExitClick}
                        >
                            {lang.exitButton}
                            <img src={Exit} className="imgOption" />
                        </div>
                    </div>
                    <div className='creaturesContainer'>
                        {chooseOptions.map((creature, index) => {
                            if (index < 2) {
                                return (
                                    <ShopOption key={index} creature={creature} />
                                )
                            }

                        })}
                    </div>
                </div>
            }
        </>
    )
}

function ShopOption({ creature }) {
    const { setSelectedItem, changeWindow, setInitWindow,coins,setCoins,
        languajeDocument
     } = useGame()

    const lang=languajeDocument.Shop
    const creaturePrice=getCreaturePrice(creature)
    
    const handleViewClick = () => {
        const newSelected = {
            itemType: ITEM_TYPES.CREATURE,
            item: creature
        }
        setSelectedItem(newSelected)
        changeWindow(WINDOW_NAMES.VIEW_CREATURE)
    }

    const handleBuyClick=()=>{
        const newCoins = coins - creaturePrice
        if (newCoins >= 0) {
            setCoins(newCoins)
            setInitWindow(INIT_STATES.PURCHASED)
            handleViewClick()
        }
        
    }

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
                    <div className='price'>
                        {creaturePrice}
                        <img src={CoinIcon} className="imgOption" />
                    </div>
                    <div className='options'>
                        <div className='buttonOption'
                            onClick={handleBuyClick}
                        >
                            <b>{lang.buyButton}</b>
                        </div>
                        <div className='buttonOption'
                            onClick={handleViewClick}
                        >
                            <b>{lang.viewButton}</b>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

ShopOption.propTypes = {
    creature: PropTypes.object.isRequired
}