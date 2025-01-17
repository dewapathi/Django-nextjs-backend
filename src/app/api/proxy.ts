import { getToken } from "@/lib/auth";

export default class ApiProxy {
  static async getHeaders(requireAuth: boolean) {
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const authToken = getToken();
    if (authToken && requireAuth) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    return headers;
  }

  static async handleFetch(endpoint: string, requestOptions: any) {
    let data = {};
    let status = 500;

    try {
      const response = await fetch(endpoint, requestOptions);
      data = await response.json();
      status = response.status;
    } catch (error) {
      data = { message: "Cannot reach API server", error };
    }

    return { data, status };
  }

  static async post(endpoint: string, object: any, requireAuth: boolean) {
    const headers = await this.getHeaders(requireAuth);

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: object,
    };

    return await this.handleFetch(endpoint, requestOptions);
  }

  static async get(endpoint: string, requireAuth: boolean) {
    const headers = await this.getHeaders(requireAuth);

    const options = {
      method: "GET",
      headers: headers,
    };

    return await this.handleFetch(endpoint, options);
  }
}
