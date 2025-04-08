'use client'
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useRouter } from "next/navigation";
import authStore from "@/stores/authStore";

const LoginPage = observer(() => {
    const [username, setUsername] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await authStore.login(username);
        if (authStore.isAuthenticated) {
            router.push('/companies');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
                <h1 className="text-2xl font-bold text-center">Вход</h1>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                {authStore.error && <p className="text-red-500 text-sm">{authStore.error}</p>}
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                >
                    Войти
                </button>
            </form>
        </div>
    )
})

export default LoginPage;
