import React from 'react'
import styles from './DeleteModal.module.scss';
import companyStore from '@/stores/companyStore';
import classNames from 'classnames';
interface DeleteModalProps {
    setIsOpen: (isOpen: boolean) => void;
    photoName: string;
}

const DeleteModal = ({ setIsOpen, photoName }: DeleteModalProps) => {

    const handleDelete = async() => {
        await companyStore.deleteCompanyImage(companyStore.company!.id, photoName);
        setIsOpen(false);
    }

    return (
        <div className={styles.container} onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleDelete();
            }
        }}>
            <h1>Remove the photo?</h1>
            <p>Are you sure you want to remove this photo?</p>
            <div className={styles.actions}>
                <button onClick={() => setIsOpen(false)} className="action_btn">Cancel</button>
                <button onClick={handleDelete} className={classNames("action_btn", "active")}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteModal