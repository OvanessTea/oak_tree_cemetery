"use client"
import { useEffect } from "react";
import { setToken } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function App() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            router.push('/companies/12');
        } else {
            router.push('/login');
        }
    }, [router]);
    
    return (
        <></>
    )
}
