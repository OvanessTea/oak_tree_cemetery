import React, { useState } from 'react';
import styles from './EditModal.module.scss';

import companyStore from '@/stores/companyStore';
import classNames from 'classnames';

interface EditModalProps {
  setIsEdit: (isEdit: boolean) => void;
}

const EditModal = ({ setIsEdit }: EditModalProps) => {
  const [name, setName] = useState<string>(companyStore.company?.name || '');

  const handleSave = () => {
    companyStore.updateCompany(companyStore.company!.id, { name });
    setIsEdit(false);
  }

  return (
    <div className={styles.container} onKeyDown={(e) => {
      if (e.key === 'Enter' && name !== '') {
        handleSave();
      }
    }}>
      <h1>Specify the Organization's name</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
      <div className={styles.actions}>
        <button onClick={() => setIsEdit(false)} className="action_btn">Cancel</button>
        <button onClick={handleSave} className={classNames("action_btn", "active")}>Save Changes</button>
      </div>
    </div>
  )
}

export default EditModal