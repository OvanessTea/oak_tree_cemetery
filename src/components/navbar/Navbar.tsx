'use client';
import signOut from "@/assets/sign_out.svg";
import settings from "@/assets/settings.svg";
import logo from "@/assets/logo.svg";
import company from "@/assets/company.svg";
import search from "@/assets/search.svg";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import authStore from "@/stores/authStore";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export const Navbar = () => {

    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        authStore.logout();
        router.push("/login");
    }

    return (
        <div className={styles.actions}>
            <div className={styles.top}>
                <Link id={styles.logo} href="/companies" className={pathname === "/companies" ? styles.active : ""}>
                    <Image src={logo} alt="Logo" width={36} height={36} />
                </Link>
                <Link href="/companies" className={pathname === "/companies" ? styles.active : ""}>
                    <Image src={company} alt="Company" width={20} height={20} />
                </Link>
                <Link href="/search" className={pathname === "/search" ? styles.active : ""}>
                    <Image src={search} alt="Search" width={20} height={20} />
                </Link>
            </div>
            <div className={styles.bottom}>
                <Link href="/settings" className={pathname === "/settings" ? styles.active : ""}>
                    <Image src={settings} alt="Settings" width={20} height={20} />
                </Link>
                <Link href="/login" className={styles.logout_btn} onClick={handleLogout}>
                    <Image src={signOut} alt="Sign out" width={20} height={20} />
                </Link>
            </div>
        </div>
    )
}
