import spAttack from '../../assets/animations/spAttack.svg'
import { PropTypes } from 'prop-types'

export function SpAttack({ duration, colorFilter, rival }) {
    const style = {
        position: "absolute",
        zIndex: "3",
        opacity: "1",
        filter: colorFilter,
        visibility: "hidden"
    }

    if (rival) {
        style['width'] = "60px"
        style['height'] = "60px"
        style['left'] = "600px"
        style['bottom'] = "200px"
        style['transform'] = "rotate(0.20turn)"
        style['animationName'] = "attackAnimationRival"
        style['animationDuration'] = duration + "s"
        style['animationTimingFunction'] = "ease-in"
    } else {
        style['width'] = "90px"
        style['height'] = "90px"
        style['left'] = "300px"
        style['bottom'] = "120px"
        style['transform'] = "rotate(0.7turn)";
        style['animationName'] = "attackAnimationPlayer"
        style['animationDuration'] = duration + "s"
        style['animationTimingFunction'] = "ease-in"
    }

    return (
        <>
            <img src={spAttack} style={style} />
        </>
    )
}

SpAttack.propTypes = {
    duration: PropTypes.number.isRequired,
    colorFilter: PropTypes.string.isRequired,
    rival: PropTypes.bool.isRequired
}