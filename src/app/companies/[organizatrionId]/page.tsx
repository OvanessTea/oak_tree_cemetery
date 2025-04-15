'use client'
import { useEffect } from "react";
import styles from "./OrganizationsPage.module.scss";
import Link from "next/link";
import Image from "next/image";
import chevron from "../../../../public/chevron.svg";
import OrganizationInfo from "./OrganizationInfo";
import companyStore from "@/stores/companyStore";
import { observer } from "mobx-react-lite";
import { useParams } from "next/navigation";
import CompanyNotFound from "./CompanyNotFound";
import contactStore from "@/stores/contactStore";

const OrganizationsPage = observer(() => {
    const { organizatrionId } = useParams();

    useEffect(() => {
        companyStore.setCompany(organizatrionId as string || '12').then(() => {
            contactStore.setContact(companyStore.company?.contactId || '');
        });
    }, [organizatrionId]);

    if (companyStore.isLoading) return null;
    if (companyStore.notFound) return <CompanyNotFound />;
    if (!companyStore.company) return null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.go_back_btn_container}>
                    <div className="icon_btn">
                        <Link href="/companies">
                            <Image src={chevron} alt="Back" height={20} width={20} />
                        </Link>
                    </div>
                </div>
                {companyStore.company && <OrganizationInfo company={companyStore.company}/>}
            </div>
        </div>
    )
})

export default OrganizationsPage;