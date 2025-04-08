"use client"
import React from 'react'
import { CompanyType } from '@/types/company.type';
import add_photo from '@/assets/add_photo.svg';
import Image from 'next/image';
import classNames from 'classnames';
import trash from '@/assets/trash.svg';
import styles from './Photos.module.scss';

interface PhotosProps {
    company: CompanyType;
}

const Photos = ({ company }: PhotosProps) => {

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Photos</h1>
                <div className={styles.actions}>
                    <button className={classNames("action_btn", styles.add_btn)}>
                        <Image src={add_photo} alt="Add photo" height={16} width={16} />
                        <p>Add</p>
                    </button>
                </div>
            </div>
            <div className={styles.content}>
                {company.photos.map((photo) => (
                    <div key={photo.name} className={styles.photo_container}>
                        <Image className={styles.photo} src={photo.filepath} alt={photo.name} height={100} width={100} />
                        <button className={styles.delete_btn}>
                            <Image src={trash} alt="Delete" height={16} width={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Photos