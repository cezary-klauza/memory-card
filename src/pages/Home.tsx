import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import SelectList from "../components/SelectList";
import {
  difficulty as difficultyConst,
  illustrations as illustrationsConst,
} from "../constants";
import { useSettingStore } from "../stores/settingsStore";
import { useGameStore } from "../stores/gameStore";
import GameHistory from "../components/GameHistory";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { setDifficulty, setIllustrations, clear, difficulty, illustrations } =
    useSettingStore();
  const { setList, end } = useGameStore();

  // clear all settings and game state
  useEffect(() => {
    clear();
    end();
  }, [clear, end]);

  const clickHandler = () => {
    if (difficulty !== undefined && illustrations !== undefined) {
      switch (difficulty) {
        case "Easy":
          setList(illustrations.list.slice(0, 4));
          break;
        case "Normal":
          setList(illustrations.list.slice(0, 12));
          break;
        case "Hard":
          setList(illustrations.list);
          break;
      }

      navigate("/game");
    }
  };

  return (
    <>
      <div className="new-game">
        <h2>New Game</h2>
        <div className="lists">
          <SelectList
            set={setIllustrations}
            list={illustrationsConst}
            name="Illustration Type"
          />
          <SelectList
            set={setDifficulty}
            list={difficultyConst}
            name="Difficulty"
          />
        </div>
        <Button
          active={difficulty !== undefined && illustrations !== undefined}
          onClick={clickHandler}
        >
          Start
        </Button>
      </div>

      <GameHistory />
    </>
  );
};

export default Home;
