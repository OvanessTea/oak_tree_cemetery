"use client"
import React, { useEffect, useState } from 'react'
import { UpdateContactType } from '@/types/contact.type';
import styles from './Contacts.module.scss';
import edit from '../../../../../public/edit.svg';
import Image from 'next/image';
import classNames from 'classnames';
import contactStore from '@/stores/contactStore';
import { observer } from 'mobx-react-lite';
import { AnimatePresence, motion } from 'framer-motion';
import check from '../../../../../public/check.svg';
import x from '../../../../../public/x.svg';
import { isValidPhoneNumber, parsePhoneNumber, isValidNumber } from 'libphonenumber-js';
import { countryCodes } from '@/types/country.codes';


const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.15 }
}

const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

const validatePhone = (phone: string) => {
    for (const countryCode of countryCodes) {
        if (isValidPhoneNumber(phone, countryCode)) {
            return true;
        }
    }
    return false;
}

const Contacts = observer(() => {
    const [isEdit, setIsEdit] = useState(false);
    const { contact } = contactStore;
    const [fullname, setFullname] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const disableRules =
        !fullname ||
        !phone ||
        !email ||
        !validateEmail(email) ||
        !validatePhone(phone)

    const submitChanges = async () => {
        const data: UpdateContactType = {
            lastname: fullname.split(' ')[1],
            firstname: fullname.split(' ')[0],
            phone: phone.replace(/^\+/, '').replace(/ /g, ''),
            email: email,
        }
        try {
            const status = await contactStore.updateContact(contact?.id || '', data);
            if (status === 200) {
                setIsEdit(false);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const formatPhone = (phone: string) => {
        for (const countryCode of countryCodes) {
            if (isValidNumber(phone, countryCode)) {
                const parsedPhone = parsePhoneNumber(phone, countryCode);
                if (parsedPhone) {
                    if (parsedPhone.formatInternational().replace(/\s/g, '') === `+${phone.replace(/\s/g, '')}`) {
                        return parsedPhone.formatInternational();
                    }
                }
            }
        }
        return phone;
    }
    useEffect(() => {
        const initializeContact = () => {
            if (contact) {
                setFullname(contact.firstname + ' ' + contact.lastname);
                setPhone(formatPhone(contact.phone));
                setEmail(contact.email);
            }
        };
        initializeContact();
    }, [contact]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Contacts</h1>
                <div className={styles.actions}>
                    <AnimatePresence mode="wait">
                        {isEdit ? (
                            <motion.div
                                className={styles.edit_actions}
                                key="edit"
                                {...animationProps}
                            >
                                <button
                                    disabled={disableRules}
                                    className={classNames("action_btn", disableRules && "disabled")}
                                    onClick={() => submitChanges()}
                                >
                                    <Image src={check} alt="Save changes" height={16} width={16} />
                                    <p>Save changes</p>
                                </button>
                                <button className={classNames("action_btn")} onClick={() => setIsEdit(false)}>
                                    <Image src={x} alt="Cancel" height={16} width={16} />
                                    <p>Cancel</p>
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                className={styles.edit_btn}
                                key="view"
                                {...animationProps}
                            >
                                <button className={classNames("action_btn", styles.edit_btn)} onClick={() => setIsEdit(true)}>
                                    <Image src={edit} alt="Edit" height={16} width={16} />
                                    <p>Edit</p>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <AnimatePresence mode="wait">
                {
                    isEdit ? (
                        <motion.div
                            className={classNames(styles.content, styles.editable)}
                            key="edit"
                            {...animationProps}
                        >
                            <div className={styles.row}>
                                <div className={styles.label}>Responsible person:</div>
                                <input
                                    className={styles.value}
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                            </div>
                            <div className={styles.row}>
                                <div className={styles.label}>Phone number:</div>
                                <input
                                    className={styles.value}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className={styles.row}>
                                <div className={styles.label}>Email:</div>
                                <input
                                    className={styles.value}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            className={styles.content}
                            key="view"
                            {...animationProps}
                        >
                            <div className={styles.row}>
                                <div className={styles.label}>Responsible person:</div>
                                <div className={styles.value}>{contact?.firstname} {contact?.lastname}</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.label}>Phone number:</div>
                                <div className={styles.value}>{contact && formatPhone(contact.phone)}</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.label}>Email:</div>
                                <div className={styles.value}>{contact?.email}</div>
                            </div>
                        </motion.div>
                    )}
            </AnimatePresence>
        </div>
    )
});

export default Contacts