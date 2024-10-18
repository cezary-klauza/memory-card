import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { useGameStore } from "../stores/gameStore";
import { useSettingStore } from "../stores/settingsStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  return `${minutes}:${formattedSeconds}`;
}

const Game = () => {
  const { difficulty, illustrations } = useSettingStore();
  const { matched, fails, time, list, startTimer, clear, end } = useGameStore();

  const timer = useRef<number | null>(null);
  const [isEnd, setIsEnd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      difficulty === undefined ||
      illustrations === undefined ||
      list.length === 0
    ) {
      end();
      navigate("/");
    }
  }, [difficulty, end, illustrations, list.length, navigate]);

  useEffect(() => {
    setTimeout(() => clear(), 500);
  }, [fails, clear]);

  useEffect(() => {
    timer.current = setInterval(startTimer, 1000);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [startTimer]);

  useEffect(() => {
    const pairs = difficulty === "Easy" ? 4 : difficulty === "Normal" ? 12 : 24;
    if (matched.length === pairs) {
      setIsEnd(true);

      const gameHistory = JSON.parse(localStorage.getItem("games") || "[]");

      const today = new Date().toISOString();

      const newGame = {
        illustrations: illustrations?.title,
        difficulty: difficulty,
        date: today,
        time: formatTime(time),
        fails: fails,
      };

      gameHistory.unshift(newGame);

      localStorage.setItem("games", JSON.stringify(gameHistory));

      setTimeout(() => {
        end();
        navigate("/");
      }, 2000);
      if (timer.current) clearInterval(timer.current);
    }
  }, [difficulty, end, matched.length, navigate]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isEnd ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 2 }}
      className="game"
    >
      <div className="scores">
        <div className="score">
          <img src="/time.svg" alt="clock" />
          <p>{formatTime(time)}</p>
        </div>
        <div className="score">
          <img src="/x.svg" alt="fails" />
          <p>{fails}</p>
        </div>
        <div className="score">
          <img src="/match.svg" alt="cards" />
          <p>
            {matched.length}/
            {difficulty === "Easy"
              ? "4"
              : difficulty === "Normal"
              ? "12"
              : "24"}
          </p>
        </div>
      </div>

      <div className={`grid ${difficulty?.toLowerCase()}`}>
        {list.map(({ image, background }, index) => (
          <Card img={image} background={background} index={index} key={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default Game;
