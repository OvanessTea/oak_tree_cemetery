"use client"
import React, { useState } from 'react'
import { CompanyType } from '@/types/company.type';
import add_photo from '@/assets/add_photo.svg';
import Image from 'next/image';
import classNames from 'classnames';
import trash from '@/assets/trash.svg';
import styles from './Photos.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { Modal } from '@/components/modal/Modal';
import AddModal from './add_modal/AddModal';
import DeleteModal from './delete_modal/DeleteModal';
import { observer } from 'mobx-react-lite';

interface PhotosProps {
    company: CompanyType;
}

const Photos = observer(({ company }: PhotosProps) => {
    const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false);
    const [isDeletePhotoModalOpen, setIsDeletePhotoModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Photos</h1>
                <div className={styles.actions}>
                    <button className={classNames("action_btn", styles.add_btn)} onClick={() => setIsAddPhotoModalOpen(true)}>
                        <Image src={add_photo} alt="Add photo" height={16} width={16} />
                        <p>Add</p>
                    </button>
                </div>
            </div>
            <div className={styles.content}>
                {company.photos.length === 0 && <p className={styles.no_photos}>There are no photos yet :(</p>}
                {company.photos.map((photo) => (
                    <div key={photo.name} className={styles.photo_container}>
                        <Image className={styles.photo} src={photo.filepath} alt={photo.name} height={100} width={100} />
                        <button className={styles.delete_btn} onClick={() => {
                            setSelectedPhoto(photo.name);
                            setIsDeletePhotoModalOpen(true);
                        }}>
                            <Image src={trash} alt="Delete" height={16} width={16} />
                        </button>
                    </div>
                ))}
            </div>
            <AnimatePresence>
                {isAddPhotoModalOpen &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Modal isOpen={isAddPhotoModalOpen} onClose={() => setIsAddPhotoModalOpen(false)}>
                            <AddModal setIsOpen={setIsAddPhotoModalOpen}/>
                        </Modal>
                    </motion.div>
                }
            </AnimatePresence>
            <AnimatePresence>
                {isDeletePhotoModalOpen &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Modal isOpen={isDeletePhotoModalOpen} onClose={() => setIsDeletePhotoModalOpen(false)}>
                            <DeleteModal setIsOpen={setIsDeletePhotoModalOpen} photoName={selectedPhoto!}/>
                        </Modal>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
})

export default Photos