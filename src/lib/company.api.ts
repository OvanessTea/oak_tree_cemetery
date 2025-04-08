import { authorizedFetch } from "./api";

export const getCompany = async (id: string) => {
    try {
        const res = await authorizedFetch(`/companies/${id}`);
        return res;
    } catch (error: any) {
        if (error.message === 'Failed to fetch data') {
            throw { response: { status: 404 } };
        }
        throw error;
    }
};

export const updateCompany = async (id: string, data: any) => {
    const res = await authorizedFetch(`/companies/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return res;
};

export const deleteCompany = async (id: string) => {
    return await authorizedFetch(`/companies/${id}`, {
        method: 'DELETE',
    });
};

export const uploadCompanyImage = async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res =  await authorizedFetch(`/companies/${id}/image`, {
        method: 'POST',
        body: formData,
    });
    return res;
};

export const deleteCompanyImage = async (id: string, imageId: string) => {
    return await authorizedFetch(`/companies/${id}/image/${imageId}`, {
        method: 'DELETE',
    });
};




