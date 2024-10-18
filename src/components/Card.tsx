import { motion } from "framer-motion";
import { useGameStore } from "../stores/gameStore";
import { useEffect, useState } from "react";

const Card = ({
  img,
  background,
  index,
}: {
  img: string;
  background: string;
  index: number;
}) => {
  const { matched, selected, select } = useGameStore();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(
      matched.includes(img) || selected.some((item) => item.index === index)
    );
  }, [img, index, matched, matched.length, selected, selected.length]);

  return (
    <div className="card" onClick={() => select(index, img)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        className={`front ${background}`}
      >
        <img src={img} alt="card image" />
        <div className="shadow" aria-hidden />
      </motion.div>
      <div className="back">
        <div className="glow" aria-hidden />
        <img src="/question-mark.svg" alt="question-mark" />
      </div>
    </div>
  );
};

export default Card;
