import { useState, useRef, useEffect } from "react";
import styles from "./Select.module.scss";
import Image from "next/image";
import input from "../../../public/input.svg";
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

const MAX_LABEL_LENGTH = 50;

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
            const selectedOptions = options.filter((o) => value.includes(o.label));
            let totalLength = 0;
            const visibleLabels: string[] = [];
            const hiddenLabels: string[] = [];

            for (const opt of selectedOptions) {
                if (totalLength + opt.label.length <= MAX_LABEL_LENGTH) {
                    visibleLabels.push(opt.label);
                    totalLength += opt.label.length;
                } else {
                    hiddenLabels.push(opt.label);
                }
            }

            return (
                <div className={styles.multiDisplay}>
                    {visibleLabels.length > 0 && (
                        <span className={styles.fit} title={visibleLabels.join(", ")}>
                            {visibleLabels.join(", ")}
                        </span>
                    )}
                    {hiddenLabels.length > 0 && (
                        <span className={styles.more} title={hiddenLabels.join(", ")}>
                            +{hiddenLabels.length}
                        </span>
                    )}
                </div>
            );
        } else {
            const label = options.find((o) => o.label === value)?.label;
            return (
                <span className={styles.singleDisplay} title={label}>
                    {label}
                </span>
            );
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
                className={classNames(styles.fake_input, isOpen && styles.open, value.length > 0 && styles.filled)}
            >
                {value.length > 0 ? getDisplayLabel() : placeholder}
                <Image className={isOpen ? styles.open : ''} src={input} alt="input" width={20} height={20} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul className={styles.options} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                        {options.map((opt) => (
                            <motion.li
                                key={opt.value}
                                onClick={() => handleOptionClick(opt.label)}
                                className={classNames(styles.item, isSelected(opt.label) && styles.selected, multiple && styles.multiple)}
                            >
                                    {multiple && (
                                        <div>
                                            <input
                                                type="checkbox"
                                                checked={isSelected(opt.label)}
                                                readOnly
                                                />
                                            <span className={styles.checkmark}></span>
                                        </div>
                                    )}
                                    <p>{opt.label}</p>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
