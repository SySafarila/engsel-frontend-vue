import axios, { AxiosError } from "axios";

export default async function logout() {
  const config = useRuntimeConfig();
  try {
    await axios.post(`${config.public.BACKEND_URL}/auth/logout`, null, {
      withCredentials: true,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new HTTPError(error.message, error.status ?? 500);
    }
  }
}
