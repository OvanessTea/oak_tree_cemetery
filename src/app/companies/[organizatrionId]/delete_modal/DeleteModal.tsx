import React from 'react';
import styles from './DeleteModal.module.scss';
import companyStore from '@/stores/companyStore';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';

interface DeleteModalProps {
  setIsDelete: (isDelete: boolean) => void;
}

const DeleteModal = ({ setIsDelete }: DeleteModalProps) => {
  const router = useRouter();
  const handleDelete = () => {
    companyStore.deleteCompany(companyStore.company!.id);
    setIsDelete(false);
    router.push('/companies');
  }

  return (
    <div className={styles.container} onKeyDown={(e) => {
      if (e.key === 'Enter') {
        handleDelete();
      }
    }}>
      <h1>Specify the Organization's name</h1>
      <p>Are you sure you want to remove this Organozation?</p>
      <div className={styles.actions}>
        <button onClick={() => setIsDelete(false)} className="action_btn">Cancel</button>
        <button onClick={handleDelete} className={classNames("action_btn", "active")}>Delete</button>
      </div>
    </div>
  )
}

export default DeleteModal