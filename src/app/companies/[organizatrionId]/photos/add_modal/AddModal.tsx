import companyStore from '@/stores/companyStore';
import React, { useState } from 'react'
import styles from './AddModal.module.scss';
import classNames from 'classnames';
interface AddModalProps {
    setIsOpen: (isOpen: boolean) => void;
}

const AddModal = ({ setIsOpen }: AddModalProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setFiles(Array.from(e.dataTransfer.files));
    };

    const handleUpload = async () => {
        files.forEach((file) => {
            companyStore.uploadCompanyImage(companyStore.company?.id || '', file);
        });
    };
    return (
        <div className={styles.container}>
            <div
                className={styles.content}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <h1>Upload photos</h1>

                <div className={styles.drop_zone}>
                    <p className={styles.drop_zone_text}>Drag and drop files here</p>
                    <p className={styles.drop_zone_text}>or</p>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFilesChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.actions}>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="action_btn"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={files.length === 0}
                        className={classNames("action_btn", "active")}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddModal