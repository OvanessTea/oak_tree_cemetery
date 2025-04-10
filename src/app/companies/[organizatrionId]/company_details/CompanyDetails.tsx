import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { CompanyType, UpdateCompanyType } from '@/types/company.type';
import styles from './CompanyDetails.module.scss';
import edit from '@/assets/edit.svg';
import check from '@/assets/check.svg';
import x from '@/assets/x.svg';
import Image from 'next/image';
import classNames from 'classnames';
import Select from '@/components/select/Select';
import companyStore from '@/stores/companyStore';

interface CompanyDetailsProps {
    company: CompanyType;
}

const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.15 }
}

const businessEntities = [
    {
        label: 'Sole Proprietorship',
        value: 'sole_proprietorship'
    },
    {
        label: 'Partnership',
        value: 'partnership'
    },
    {
        label: 'Limited Liability Company',
        value: 'limited_liability_company'
    }
];
const companyTypes = [
    {
        label: 'Funeral Home',
        value: 'funeral_home'
    },
    {
        label: 'Logistics Services',
        value: 'logistics_services'
    },
    {
        label: 'Burial Care Contractor',
        value: 'burial_care_contractor'
    }
]

const CompanyDetails = ({ company }: CompanyDetailsProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const [agreementNumber, setAgreementNumber] = useState<string>(company.contract.no);
    const [agreementDate, setAgreementDate] = useState<string>(new Date(company.contract.issue_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '.'));
    const [businessEntity, setBusinessEntity] = useState<string>(businessEntities.find(entity => entity.value === company.businessEntity.toLowerCase())?.label || '');
    const [selectedCompanyTypes, setSelectedCompanyTypes] = useState<string[]>(company.type.map(type => type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')));

    const disableRules = 
        !agreementNumber ||
        !agreementDate ||
        !businessEntity ||
        !selectedCompanyTypes.length
    

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/[^\d]/g, '');
        if (value.length > 2 && value.length <= 4) {
            value = `${value.slice(0, 2)}.${value.slice(2)}`;
        } else if (value.length > 4) {
            value = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4, 8)}`;
        }
        setAgreementDate(value);
    };

    const submitChanges = async () => {
        const [month, day, year] = agreementDate.split('.');
        const data: UpdateCompanyType = {
            businessEntity: businessEntities.find(entity => entity.label === businessEntity)?.value || '',
            contract: {
                no: agreementNumber,
                issue_date: new Date(+year, +month - 1, +day),
            },
            type: companyTypes.filter(type => selectedCompanyTypes.includes(type.label)).map(type => type.value),
        }
        try{
            const status = await companyStore.updateCompany(company.id, data);
            if (status === 200) {
                setIsEdit(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Company Details</h1>
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
                                <div className={styles.label}>Agreement number:</div>
                                <input
                                    className={classNames(styles.value, agreementNumber === '' && "empty")}
                                    value={agreementNumber}
                                    onChange={(e) => setAgreementNumber(e.target.value)}
                                />
                                <div className={classNames(styles.label, styles.date)}>Date:</div>
                                <input
                                    className={classNames(styles.value, agreementDate === '' && "empty")}
                                    value={agreementDate}
                                    onChange={(e) => handleDateChange(e)}
                                    placeholder="MM.DD.YYYY"
                                    maxLength={10}
                                    title="Please enter date in MM.DD.YYYY format"
                                />

                            </div>
                            <div className={styles.row}>
                                <div className={styles.label}>Business entity:</div>
                                <Select
                                    placeholder="Select business entity"
                                    options={businessEntities}
                                    value={businessEntity}
                                    onChange={(value) => setBusinessEntity(value as string)}
                                />
                            </div>
                            <div className={styles.row}>
                                <div className={styles.label}>Company type:</div>
                                <Select
                                    options={companyTypes}
                                    placeholder="Select company type"
                                    multiple={true}
                                    value={selectedCompanyTypes}
                                    onChange={(value) => setSelectedCompanyTypes(value as string[])}
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
                                <div className={styles.label}>Agreement:</div>
                                <div className={styles.value}>{`${company.contract.no}`}<span>/</span>{`${new Date(company.contract.issue_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '.')}`}</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.label}>Business entity:</div>
                                <div className={styles.value}>{businessEntities.find(entity => entity.value === company.businessEntity.toLowerCase())?.label || ''}</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.label}>Company type:</div>
                                <div className={styles.value}>{company.type.map((type) => type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join(', ')}</div>
                            </div>
                        </motion.div>
                    )}
            </AnimatePresence>
        </div>
    )
}

export default CompanyDetails