import './App.css'
import { GameProvider } from './Controller/contexts/GameContext'
import { GeneralContainer } from './View/GeneralContainer'

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
