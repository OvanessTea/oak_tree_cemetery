import React, { useState } from 'react'
import { CompanyType } from '@/types/company.type';
import styles from './OrganizationInfo.module.scss';
import Image from 'next/image';
import edit from '@/assets/edit.svg';
import trash from '@/assets/trash.svg';
import classNames from 'classnames';
import Section from '@/components/section/Section';
import CompanyDetails from './company_details/CompanyDetails';
import Contacts from './contacts/Contacts';
import Photos from './photos/Photos';
import { Modal } from '@/components/modal/Modal';
import DeleteModal from './delete_modal/DeleteModal';
import EditModal from './edit_modal/EditModal';
import { AnimatePresence, motion } from 'framer-motion';

interface OrganizationInfoProps {
    company: CompanyType;
}
const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.15 }
}

const OrganizationInfo = ({ company }: OrganizationInfoProps) => {

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{company.name}</h1>
                <div className={styles.actions}>
                    <button className={classNames(styles.edit_btn, 'icon_btn')} onClick={() => setIsEdit(true)}>
                        <Image src={edit} alt="Edit" height={20} width={20} />
                    </button>
                    <button className={classNames(styles.delete_btn, 'icon_btn')} onClick={() => setIsDelete(true)}>
                        <Image src={trash} alt="Delete" height={20} width={20} />
                    </button>
                </div>
            </div>
            <div className={styles.content}>
                <Section>
                    <CompanyDetails company={company} />
                </Section>
                <Section>
                    <Contacts />
                </Section>
                <Section>
                    <Photos company={company} />
                </Section>
            </div>
            <div className={styles.modals}>
                <AnimatePresence mode="wait">
                    {isEdit && (
                        <motion.div
                            className={styles.modal}
                            key="edit"
                            {...animationProps}
                        >
                            <Modal isOpen={isEdit} onClose={() => setIsEdit(false)}>
                                <EditModal setIsEdit={setIsEdit} />
                            </Modal>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                    {isDelete && (
                        <motion.div
                            className={styles.modal}
                            key="delete"
                            {...animationProps}
                        >
                            <Modal isOpen={isDelete} onClose={() => setIsDelete(false)}>
                                <DeleteModal setIsDelete={setIsDelete} />
                            </Modal>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default OrganizationInfo