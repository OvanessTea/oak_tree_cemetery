"use client"
import React, { useEffect, useState } from 'react'
import { CompanyType } from '@/types/company.type';
import { ContactType } from '@/types/contact.type';
import styles from './Contacts.module.scss';
import edit from '@/assets/edit.svg';
import Image from 'next/image';
import classNames from 'classnames';
import { getContact } from '@/lib/contacts.api';

interface ContactsProps {
    company: CompanyType;
}

const Contacts = ({ company }: ContactsProps) => {

    const [contacts, setContacts] = useState<ContactType | null>(null);

    useEffect(() => {
        getContact(company.contactId).then((data: ContactType) => {
            setContacts(data);
        });
    }, [company.contactId]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Contacts</h1>
                <div className={styles.actions}>
                    <button className={classNames("action_btn", styles.edit_btn)}>
                        <Image src={edit} alt="Edit" height={16} width={16} />
                        <p>Edit</p>
                    </button>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.row}>
                    <div className={styles.label}>Responsible person:</div>
                    <div className={styles.value}>{contacts?.firstname} {contacts?.lastname}</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.label}>Phone number:</div>
                    <div className={styles.value}>{contacts?.phone}</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.label}>Email:</div>
                    <div className={styles.value}>{contacts?.email}</div>
                </div>
            </div>
        </div>
    )
}

export default Contacts