import './App.css'
import { GameProvider } from './Logic/contexts/GameContext'
import { GeneralContainer } from './Components/GeneralContainer'

function App() {

  return (
    <>
      <GameProvider>
        <GeneralContainer />
      </GameProvider>
    </>
  )
}

export default App
