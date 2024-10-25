import { useGame } from '../Logic/hooks/useGame'
import './Footer.css'

export function Footer(){
    const {languajeDocument} = useGame()
    const lang = languajeDocument.Footer
    
    return(
        <>
            <footer>
                <div className="footerPositioner">
                    <div className='option'>
                        <b>{lang.author}:</b>
                        <a 
                            href='https://github.com/JoseMR6?tab=repositories'
                            target='_blank'
                        >
                            JoseMR6
                        </a>
                    </div>
                    <div className='separator'/>
                    <div className='option'>
                        <b>{lang.images}:</b>
                        <a 
                            href='https://www.svgrepo.com/'
                            target='_blank'
                        >
                            SVG-Repo.
                        </a>
                        <a 
                            href='https://play.pokemonshowdown.com/sprites/trainers/'
                            target='_blank'
                        >
                            Pokémon-Showdown sprites-trainers.
                        </a>
                        <a 
                            href='https://github.com/duiker101/pokemon-type-svg-icons'
                            target='_blank'
                        >
                            duiker101 pokemon-type-svg-icons.
                        </a>
                        <a 
                            href='https://github.com/jnovack/pokemon-svg/tree/master'
                            target='_blank'
                        >
                            jnovack pokemon-svg.
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}