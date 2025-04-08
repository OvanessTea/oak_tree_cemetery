"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/api";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            router.push('/companies/12');
        } else {
            router.push('/login');
        }
    }, []);
    
    return (
        <></>
    )
}
