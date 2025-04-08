import { authorizedFetch } from "./api";

export const getContact = async (id: string) => {
    const res = await authorizedFetch(`/contacts/${id}`);
    return res;
};

export const updateContact = async (id: string, data: any) => {
    const res = await authorizedFetch(`/contacts/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return res;
}