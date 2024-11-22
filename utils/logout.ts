import axios, { AxiosError } from "axios";

export default async function logout() {
  try {
    await axios.post("/api/logout");
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new HTTPError(error.message, error.status ?? 500);
    }
  }
}
