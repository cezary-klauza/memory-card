import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import SelectList from "../components/SelectList"
import { difficulty, illustrations } from "../constants"
import { useSettingStore } from "../stores/settingsStore"

const Home = () => {
    const navigate = useNavigate();
    const { setDifficulty, setIllustrations } = useSettingStore();

    const clickHandler = () => {
        navigate('/game');
    }
  return (
    <>
        <div className='new-game'>
            <h2>New Game</h2>
            <div className="lists">
            <SelectList set={setIllustrations} list={illustrations} name='Illustration Type' />
            <SelectList set={setDifficulty} list={difficulty} name='Difficulty' />
            </div>
            <Button onClick={clickHandler}>Start</Button>
        </div>
    </>
  )
}

export default Home