export type CompanyType =
    {
        id: string;
        contactId: string;
        name: string;
        shortName: string;
        businessEntity: string;
        contract: {
            no: string;
            issue_date: string;
        };
        type: string[];
        status: string;
        photos: {
            name: string;
            filepath: string;
            thumbpath: string;
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }

    export type UpdateContactType = {
        "name"?: string,
        "shortName"?: string,
        "businessEntity"?: string,
        "contract"?: {
            no?: string,
            issue_date?: Date,
        },
        type?: string[]
    }