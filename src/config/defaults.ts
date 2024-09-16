export const DJANAGO_PORT = process.env.DJANAGO_PORT
  ? process.env.DJANAGO_PORT
  : "8000";
export const DJANAGO_BASE_URL = process.env.DJANAGO_BASE_URL
  ? process.env.DJANAGO_BASE_URL
  : `http://127.0.0.1:${DJANAGO_PORT}`;
export const DJANAGO_API_ENDPOINT = `${DJANAGO_BASE_URL}/api`;
