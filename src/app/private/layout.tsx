'use client'

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import authStore from "@/stores/authStore";
import { observer } from "mobx-react-lite";

const PrivateLayout = observer(({children}: {children: ReactNode}) => {
    const router = useRouter();

    useEffect(() => {
        if (!authStore.isAuthenticated) {   
            router.push('/login');
        }
    }, [authStore.isAuthenticated, router]);

    return (
        <>
            {children}
        </>
    )
});

export default PrivateLayout;
