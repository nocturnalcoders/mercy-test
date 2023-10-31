import { fetchApi } from "./fetchApi";
export interface User {
  id?: string;
  username?: string;
  nric?: string;
  wallets: string[];
  walletAddress?: string;
}

export interface Response {
  data: User;
  error: string;
  success: boolean;
  message: string;
}
export const fetchUserApi = fetchApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<Response, Partial<User>>({
      query(body) {
        return {
          url: `api/v1/`,
          method: "POST",
          body,
        };
      },
    }),
    user: build.query<Response, string | undefined | null>({
      query: (address) => `api/v1/${address}`,
    }),
  }),
});

export const {
  useRegisterMutation,
  useUserQuery,
} = fetchUserApi;
