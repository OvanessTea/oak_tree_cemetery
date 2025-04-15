let token: string | null = null;

export const setToken = async (username: string) => {
    const res = await fetch(`https://test-task-api.allfuneral.com/auth?user=${username}`);
    if (!res.ok) {
        throw new Error('Authentication failed');
    }
    const authHeader = res.headers.get('Authorization');
    if (authHeader) {
        token = authHeader.replace('Bearer ', '');
    } else {
        throw new Error('No token received');
    }
    return token;
};

export const authorizedFetch = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token is undefined');
    }
    const headers =  {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };
    const res = await fetch(`https://test-task-api.allfuneral.com`, { ...options, headers });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    if (options.method === 'DELETE') {
        return res;
    }
    return res.json();
};


