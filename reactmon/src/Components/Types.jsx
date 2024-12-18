import { createElement } from 'react'
import { ELEMENTAL_TYPES } from '../Logic/constants'
import './Types.css'
import { PropTypes } from 'prop-types'

export function ElemntIcon({ type }) {
    const typesComponents = [
        {
            name:ELEMENTAL_TYPES.FIRE,
            component:FireIcon
        },
        {
            name:ELEMENTAL_TYPES.GRASS,
            component:GrassIcon
        },
        {
            name:ELEMENTAL_TYPES.WATER,
            component:WaterIcon
        },
        {
            name:ELEMENTAL_TYPES.NEUTRAL,
            component:NeutralIcon
        }
    ]
    
    return (
        <>
            {typesComponents.map((typeComponent,index)=>{
                if(type == typeComponent.name){
                    return createElement(typeComponent.component,{key:index})
                }
            })}
        </>
    )
}

ElemntIcon.propTypes = {
    type: PropTypes.string.isRequired
}

export function FireIcon() {
    return (
        <div className="fire icon">
            <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M352.258 395.394C358.584 372.263 346.305 324.71 346.305 324.71C346.305 324.71 337.399 363.449 323.483 377.767C311.611 389.98 297.066 398.451 276.206 400.677C293.261 392.393 304.99 375.12 304.99 355.155C304.99 327.129 281.878 304.409 253.368 304.409C224.858 304.409 201.745 327.129 201.745 355.155C201.745 362.809 203.47 370.068 206.557 376.576C188.725 362.37 185.921 339.594 185.921 339.594C185.921 339.594 166.009 422.264 220.875 461.152C275.74 500.04 383.219 466.614 383.219 466.614C383.219 466.614 229.41 574.837 115.436 457.05C17.2568 355.584 89.8111 222.003 89.8111 222.003C89.8111 222.003 86.6777 234.395 86.6777 248.78C86.6777 263.165 94.477 274.11 94.477 274.11C94.477 274.11 117.742 225.071 135.848 205.128C152.984 186.254 174.465 170.946 193.019 157.724C207.301 147.546 219.849 138.604 227.343 130.223C268.62 84.0687 243.311 0 243.311 0C243.311 0 289.841 41.02 302.831 93.9978C307.783 114.192 304.597 137.169 301.749 157.716C297.125 191.072 293.388 218.025 326.793 216.276C380.775 213.449 333.866 130.223 333.866 130.223C333.866 130.223 456.318 194.583 447.17 307.145C438.021 419.707 313.324 445.297 313.324 445.297C313.324 445.297 345.931 418.525 352.258 395.394Z" fill="white" />
            </svg>
        </div>

    )
}

export function GrassIcon() {
    return (
        <div className='grass icon'>
            <svg fill="none" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="m97.4121 440.649c-1.7574-1.653-3.4954-3.338-5.2132-5.056-90.68455-90.684-90.68453-237.713 0-328.397 90.6841-90.6849 379.6401-96.7516 379.6401-96.7516s39.442 334.4646-51.242 425.1486c-80.54 80.54-205.522 89.55-296.005 27.031l72.908-89.471 116.55-25.163-95.139-9.511 60.462-61.562 68.824-15.077-54.422-16.117 54.422-98.176-77.41 86.828-29.893-42.183 10.523 69.648-53.917 60.782-24.993-76.9v102.268z" fill="#fff" fillRule="evenodd" />
            </svg>
        </div>
    )
}

export function WaterIcon() {
    return (
        <div className='water icon'>
            <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M422.172 346.515C422.172 437.897 347.813 511.977 256.086 511.977C164.359 511.977 90 437.897 90 346.515C90 257.639 247.102 13.5479 255.718 0.22781C255.915 -0.0759384 256.258 -0.0759358 256.454 0.227813C265.07 13.5479 422.172 257.639 422.172 346.515ZM228.4 458.931C144.12 440.49 158.542 347.13 158.542 347.13C158.542 347.13 181.556 403.488 237.405 421.744C293.253 439.999 360.745 413.225 360.745 413.225C360.745 413.225 312.68 477.371 228.4 458.931Z" fill="white" />
            </svg>
        </div>
    )
}

export function NeutralIcon() {
    return (
        <div className='neutral icon'>
            <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M481 256C481 380.264 380.264 481 256 481C131.736 481 31 380.264 31 256C31 131.736 131.736 31 256 31C380.264 31 481 131.736 481 256ZM384.571 256C384.571 327.008 327.008 384.571 256 384.571C184.992 384.571 127.429 327.008 127.429 256C127.429 184.992 184.992 127.429 256 127.429C327.008 127.429 384.571 184.992 384.571 256Z" fill="white" />
            </svg>
        </div>
    )
}

