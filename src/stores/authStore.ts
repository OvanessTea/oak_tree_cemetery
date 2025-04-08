import { makeAutoObservable, runInAction } from "mobx";
import { setToken as fetchToken } from "@/lib/api";
export class AuthStore {
    token: string | null = null;
    username: string | null = null;
    isAuthenticated: boolean = false;
    error: string = '';

    constructor() {
        makeAutoObservable(this);

        const savedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (savedToken) {
            this.token = savedToken;
            this.isAuthenticated = true;
        }
    }

    async login(username: string) {
        try {
            const token = await fetchToken(username);
            localStorage.setItem('token', token);
            runInAction(() => {
                this.username = username;
                this.token = localStorage.getItem('token') || null;
                this.isAuthenticated = true;
                this.error = '';
            })
        } catch (error) {
            runInAction(() => {
                this.error = 'Invalid username';
                this.isAuthenticated = false;
            })
        }
    }

    logout() {
        this.token = null;
        this.username = null;
        this.isAuthenticated = false;
        this.error = '';
        localStorage.removeItem('token');
    }
}

const authStore = new AuthStore();
export default authStore;
