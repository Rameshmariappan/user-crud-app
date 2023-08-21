import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userDataType } from "../@types/userTypes";

const API_BASE_URL = import.meta.env.VITE_APP_SAR_API_BASE_URL;

export const UserPageApi = createApi({
  reducerPath: "userpageapi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["user"],
  endpoints: (build) => ({
    getUsers: build.query<userDataType[], void>({
      query: () => "users",
      providesTags: ["user"],
    }),
    addNewUser: build.mutation<
      {},
      {
        firstname: string;
        lastname: string;
        salary: number;
        position: string;
        experience: number;
      }
    >({
      query: (body) => ({
        url: `users`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    getSingleUser: build.query<userDataType, number>({
      query: (id) => `users/${id}`,
      providesTags: ["user"],
    }),
    updateUser: build.mutation<void, userDataType>({
      query: ({ _id, ...patch }) => ({
        url: `users/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: build.mutation<{}, number>({
      query(id) {
        return {
          url: `users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetSingleUserQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = UserPageApi;
