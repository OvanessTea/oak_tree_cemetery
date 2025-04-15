'use client';
import Image from "next/image";
import styles from "./Navbar.module.scss";
import authStore from "@/stores/authStore";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
export const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        authStore.logout();
        router.push("/login");
    }

    useEffect(() => {
        setIsAuth(authStore.isAuthenticated);
    }, []);

    if (!isAuth) {
        return null;
    }
    
    return (
        <div className={styles.actions}>
            <div className={styles.top}>
                <Link id={styles.logo} href="/companies" className={pathname === "/companies" ? styles.active : ""}>
                    <Image src={"/logo.svg"} alt="Logo" width={36} height={36} />
                </Link>
                <Link href="/companies" className={pathname === "/companies" ? styles.active : ""}>
                    <Image src={"/company.svg"} alt="Company" width={20} height={20} />
                </Link>
                <Link href="/search" className={pathname === "/search" ? styles.active : ""}>
                    <Image src={"/search.svg"} alt="Search" width={20} height={20} />
                </Link>
            </div>
            <div className={styles.bottom}>
                <Link href="/settings" className={pathname === "/settings" ? styles.active : ""}>
                    <Image src={"/settings.svg"} alt="Settings" width={20} height={20} />
                </Link>
                <Link href="/login" className={styles.logout_btn} onClick={handleLogout}>
                    <Image src={"/sign_out.svg"} alt="Sign out" width={20} height={20} />
                </Link>
            </div>
        </div>
    )
}
