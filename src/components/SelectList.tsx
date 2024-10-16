import { useState } from "react";
import { motion } from "framer-motion";


type SelectListProps = {
    list: {
        icon: string,
        title: string
    }[],
    name: string;
    value: {
        icon: string,
        title: string
    } | null,
    set: (value: any) => void
}

const SelectList = ({list, name, set, value}: SelectListProps) => {
    const [isActive, setIsActive] = useState(false);

  return (
    <div className="select-list">
        <div className="item" onClick={() => setIsActive(!isActive)}>
            {
                value===null ? 
                (
                    <p>
                        {name}
                    </p>
                ) :
                (
                    <div className="select">
                        <img src={value.icon} alt={value.title} />
                        <p>
                            {value.title}
                        </p>
                    </div>
                )
            }
            <motion.img
                initial={{ rotate: 0 }}
                animate={isActive ? { rotate: 180 } : { rotate: 0 }}
                src="/arrow.svg" alt="arrow" className="arrow" />
        </div>
        <motion.ul
            initial={{ scale: 0, opacity: 0}}
            animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0}}
            className="list">
            {list.map(({icon, title}) => (
                <li className="select" key={title} onClick={() => setValue({icon, title})}>
                    <img src={`/${icon}`} alt={title} />
                    <p>{title}</p>
                </li>
            ))}
        </motion.ul>
    </div>
  )
}

export default SelectList