import { useState, useRef, useEffect } from "react";
import styles from "./Select.module.scss";
import Image from "next/image";
import input from "@/assets/input.svg";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
};

export default function Select({
  options,
  value,
  onChange,
  multiple = false,
  placeholder = "Select..."
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOptionClick = (clickedValue: string) => {
    if (multiple && Array.isArray(value)) {
      if (value.includes(clickedValue)) {
        onChange(value.filter((v) => v !== clickedValue));
      } else {
        onChange([...value, clickedValue]);
      }
    } else {
      onChange(clickedValue);
      setIsOpen(false);
    }
  };

  const isSelected = (val: string) => {
    return multiple && Array.isArray(value)
      ? value.includes(val)
      : value === val;
  };

  const getDisplayLabel = () => {
    if (multiple && Array.isArray(value)) {
      return options.filter(o => value.includes(o.label)).map(o => o.label).join(", ") || placeholder;
    } else {
      return options.find(o => o.label === value)?.label || placeholder;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(styles.fake_input, isOpen && styles.open)}
      >
        {getDisplayLabel()}
        <Image className={isOpen ? styles.open : ''} src={input} alt="input" width={20} height={20} />
      </button>
    <AnimatePresence>
      {isOpen && (
        <motion.ul className={styles.options} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
          {options.map((opt) => (
            <motion.li
              key={opt.value}
              onClick={() => handleOptionClick(opt.label)}
              className={classNames(styles.item, isSelected(opt.label) && styles.selected)}
            >
              {multiple && (
                <input
                  type="checkbox"
                  checked={isSelected(opt.label)}
                  readOnly
                />
              )}
              {opt.label}
            </motion.li>
          ))}
        </motion.ul>
      )}
      </AnimatePresence>
    </div>
  );
}