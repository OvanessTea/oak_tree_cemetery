"use client"
import PrivateLayout from "../private/layout";
import { useEffect, useState } from "react";
import { CompaniesNavbar } from "./CompaniesNavbar";
import OrganizationsPage from "./[organizatrionId]/page";
import authStore from "@/stores/authStore";
import { useRouter } from "next/navigation";

export default function CompaniesLayout() {
    const [currentTab, setCurrentTab] = useState("organizations");
    const router = useRouter();
    const getContent = () => {
        if (currentTab === "organizations") {
            return <OrganizationsPage />;
        }
    }
    useEffect(() => {
        if (!authStore.isAuthenticated) {
            router.push("/login");
        }
    }, [authStore.isAuthenticated, router]);

    if (!authStore.isAuthenticated) {
        return null;
    }
    return (
        <PrivateLayout>
            <div className="flex h-full w-full overflow-hidden max-h-[100%]">
                <CompaniesNavbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
                {getContent()}
            </div>
        </PrivateLayout>
    )
}
