import axios, { Method } from "axios";

const apiHandler = async (
    url: string,
    method: Method,
    params?: {},
    x_token?: string | null,
) => {
    const headerParams = {
        "Authorization": `Bearer ${x_token}`,
        "Content-Type": "application/json",
    } as any;
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL;

    try {
        const response = await axios({
            headers: headerParams,
            url: apiUrl + url,
            method: method,
            data: params,
        }) as any;
        console.log("apihandlerresponse", response)

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