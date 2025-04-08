"use client"
import PrivateLayout from "../private/layout";
import { ReactNode, useState } from "react";
import { CompaniesNavbar } from "./CompaniesNavbar";
import OrganizationsPage from "./[organizatrionId]/page";

export default function CompaniesLayout({children}: {children: ReactNode}) {
    const [currentTab, setCurrentTab] = useState("organizations");

    const getContent = () => {
        if (currentTab === "organizations") {
            return <OrganizationsPage />;
        }
    }
    return (
        <PrivateLayout>
            <div className="flex h-full w-full">
                <CompaniesNavbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
                {getContent()}
            </div>
        </PrivateLayout>
    )
}
