import React from 'react'
import styles from './Section.module.scss';
interface SectionProps {
    children: React.ReactNode;
}

const Section = ({children}: SectionProps) => {
  return (
    <div className={styles.section}>
        {children}
    </div>
  )
}

export default Section