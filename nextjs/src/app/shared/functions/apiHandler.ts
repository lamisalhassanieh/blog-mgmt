import axios, { Method } from "axios";

const apiHandler = async (
    url: string,
    method: Method,
    params?: {},
    x_token?: string | null,
) => {
    const headerParams = {
        "Content-Type": "application/json",
    } as any;

    if (x_token) {
        headerParams["Authorization"] = `Bearer ${x_token}`;
    }

    try {
        const response = await axios({
            headers: headerParams,
            // Use relative path to trigger Next.js rewrite
            url: `/api/${url}`,
            method: method,
            data: params,
            // Add withCredentials for CORS
            withCredentials: true
        });

        return response;
    } catch (error: any) {
        console.error('API Error:', error);
        throw error; // Throw error instead of returning it
    }
};

export default apiHandler;