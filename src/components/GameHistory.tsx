import { useEffect, useState } from "react";

type GameProps = {
  illustrations: string;
  difficulty: string;
  date: string;
  time: string;
  fails: number;
};

const Game = ({ illustrations, difficulty, date, time, fails }: GameProps) => (
  <div className="game">
    <div className="headline">
      <h3>{illustrations}</h3>
      <p>{difficulty}</p>
    </div>
    <div className="flex">
      <div className="stat">
        <img src="/callendar.svg" alt="callendar" />
        <p>{date}</p>
      </div>
      <div className="stat">
        <img src="/time.svg" alt="clock" />
        <p>{time}</p>
      </div>
    </div>
    <div className="stat">
      <img src="/x.svg" alt="fails" />
      <p>{fails}</p>
    </div>
  </div>
);

const GameHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const games = JSON.parse(localStorage.getItem("games") || "[]");
    setHistory(games);
  }, []);

  if (history.length === 0) return <></>;

  return (
    <div className="game-history">
      <h2>Games History</h2>
      <div className="container">
        {history.map(
          ({ illustrations, difficulty, date, time, fails }, index) => (
            <Game
              key={index}
              date={new Date(date).toLocaleDateString()}
              difficulty={difficulty}
              fails={fails}
              illustrations={illustrations}
              time={time}
            />
          )
        )}
      </div>
    </div>
  );
};

export default GameHistory;
