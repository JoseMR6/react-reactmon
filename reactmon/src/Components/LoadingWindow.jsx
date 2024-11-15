import './LoadingWindow.css'
import loadingIcon from '/loading.svg'

export function LoadingWindow() {
    return (
        <>
            <div className='loadingContainer'>
                <img
                    src={loadingIcon} className="imgLoading"
                />
                <h2>Loading...</h2>
            </div>
        </>
    )
}