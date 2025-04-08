import React, { useState } from 'react'
import { CompanyType } from '@/types/company.type';
import styles from './CompanyDetails.module.scss';
import edit from '@/assets/edit.svg';
import check from '@/assets/check.svg';
import x from '@/assets/x.svg';
import Image from 'next/image';
import classNames from 'classnames';

interface CompanyDetailsProps {
    company: CompanyType;
}

const CompanyDetails = ({ company }: CompanyDetailsProps) => {
    const [isEdit, setIsEdit] = useState(false);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Company Details</h1>
                <div className={styles.actions}>
                    {isEdit ? (
                        <div className={styles.edit_actions}>
                           <button className={classNames("action_btn")} onClick={() => setIsEdit(false)}>
                        <Image src={check} alt="Save changes" height={16} width={16} />
                        <p>Save changes</p>
                    </button>
                    <button className={classNames("action_btn")} onClick={() => setIsEdit(false)}>
                        <Image src={x} alt="Cancel" height={16} width={16} />
                        <p>Cancel</p>
                    </button> 
                        </div>
                        ) : (
                    <button className={classNames("action_btn", styles.edit_btn)} onClick={() => setIsEdit(true)}>
                        <Image src={edit} alt="Edit" height={16} width={16} />
                        <p>Edit</p>
                    </button>
                )}
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.row}>
                    <div className={styles.label}>Agreement:</div>
                    <div className={styles.value}>{`${company.contract.no}`}<span>/</span>{`${new Date(company.contract.issue_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '.')}`}</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.label}>Business entity:</div>
                    <div className={styles.value}>{company.businessEntity}</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.label}>Company type:</div>
                    <div className={styles.value}>{company.type.map((type) => type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join(', ')}</div>
                </div>
            </div>
        </div>
    )
}

export default CompanyDetails