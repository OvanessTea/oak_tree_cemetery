"use client";
import styles from "./CompaniesNavbar.module.scss";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import classNames from "classnames";


interface CompaniesNavbarProps {
    currentTab: string;
    setCurrentTab: Dispatch<SetStateAction<string>>;
}

export const CompaniesNavbar = (props: CompaniesNavbarProps) => {

    const { currentTab, setCurrentTab } = props;

    return (
        <div className={styles.wrapper}>
            <h1>Oak Tree Cemetery</h1>
            <p>Process Manager</p>
            <hr />
            <div className={styles.nav}>
                <button className={classNames("action_btn", currentTab === "organizations" ? "active" : "")} onClick={() => setCurrentTab("organizations")}>
                    <Image src={"/company.svg"} alt="Organizations" height={16} width={16}/>
                    <p>Organizations</p>
                </button>
                <button className={classNames("action_btn", currentTab === "contractors" ? "active" : "")} onClick={() => setCurrentTab("contractors")}>
                    <Image src={"/contractor.svg"} alt="Contractors" height={16} width={16}/>
                    <p>Contractors</p>
                </button>
                <button className={classNames("action_btn", currentTab === "clients" ? "active" : "")} onClick={() => setCurrentTab("clients")}>
                    <Image src={"/account.svg"} alt="Clients" height={16} width={16}/>
                    <p>Clients</p>
                </button>
            </div>
            <div className={styles.footer}>
                <p>All Funeral Services © 2015-2025</p>
            </div>
        </div>
    )
}