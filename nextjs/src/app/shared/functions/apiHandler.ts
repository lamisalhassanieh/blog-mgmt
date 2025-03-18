import axios, { Method } from "axios";

const apiHandler = async (
    url: string,
    method: Method,
    params?: {},
    x_token?: string | null,
) => {
    const headerParams = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        "Access-Control-Allow-Origin": "*",
    } as any;

    // Add Authorization header only if x_token exists
    if (x_token) {
        headerParams["Authorization"] = `Bearer ${x_token}`;
    }
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL;

    try {
        const response = await axios({
            headers: headerParams,
            url: apiUrl + url,
            method: method,
            data: params,
        }) as any;

        if (response) {
            return response;
        } else {
            throw new Error(`Request failed`);
        }
    } catch (error: any) {
        return error;

    }
};

export default apiHandler;