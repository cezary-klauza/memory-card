import { useState } from "react";
import { motion } from "framer-motion";

type SelectListProps = {
  list: {
    icon: string;
    title: string;
  }[];
  name: string;
  set: (value: string) => void;
};

const SelectList = ({ list, name, set }: SelectListProps) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState<{ icon: string; title: string } | null>(
    null
  );

  return (
    <div className="select-list">
      <div className="item" onClick={() => setIsActive(!isActive)}>
        {value === null ? (
          <p>{name}</p>
        ) : (
          <div className="select">
            <div className="imgWrapper">
              <img src={value.icon} alt={value.title} />
            </div>
            <p>{value.title}</p>
          </div>
        )}
        <motion.img
          initial={{ rotate: 0 }}
          animate={isActive ? { rotate: 180 } : { rotate: 0 }}
          src="/arrow.svg"
          alt="arrow"
          className="arrow"
        />
      </div>
      <motion.ul
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        className="list"
      >
        {list.map(({ icon, title }) => (
          <li
            className="select"
            key={title}
            onClick={() => {
              setValue({ icon, title });
              set(title);
              setIsActive(false);
            }}
          >
            <div className="imgWrapper">
              <img src={`/${icon}`} alt={title} />
            </div>
            <p>{title}</p>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default SelectList;
