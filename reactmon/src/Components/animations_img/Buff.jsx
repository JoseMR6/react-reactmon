import support from '../../assets/categories/support.svg'
import { PropTypes } from 'prop-types'

export function Buff({duration, colorFilter, rival}){
    let style = {
        position: "absolute",
        zIndex: "3",
        opacity: "0.5",
        filter: colorFilter,
        visibility: "hidden"
    }

    if(rival){
        style['width']="140px"
        style['height']="140px"
        style['right']="80px"
        style['top']="80px"
        style['animationName']="buffAnimationRival"
        style['animationDuration']= duration+"s"
    }else{
        style['width']="180px"
        style['height']="180px"
        style['left']="80px"
        style['bottom']="80px"
        style['animationName']="buffAnimationPlayer"
        style['animationDuration']=duration+"s"
    }


    return(
        <>
            <img src={support} style={style}/>
        </>
    )
}

Buff.propTypes = {
    duration: PropTypes.number.isRequired,
    colorFilter: PropTypes.string.isRequired,
    rival: PropTypes.bool.isRequired
}