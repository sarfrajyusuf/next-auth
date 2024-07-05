import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginUserState } from "@/redux/userSlice";
import { handleResponse, headerConfig } from "@/common";
// import { URL } from "../../Constant copy/Constant";
// import { toast } from "react-toastify";
export const loginAPI = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    prepareHeaders: (headers, { getState }) => {
      return headerConfig(headers, getState);
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "users/login",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const resp = data;
          console.log("CHECKING resp ==>", resp);
          // handleResponse(true, data, dispatch);

          dispatch(loginUserState(resp));
          handleResponse(false, data, dispatch);
        } catch (error: any) {
          handleResponse(true, error.error, dispatch);
        }
      },
    }),

    signUpUser: builder.mutation({
      query: (payload) => ({
        url: "users/signup",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const resp = data;
          console.log("CHECKING resp ==>", resp);
          //   handleResponse(true, data, dispatch);
          handleResponse(false, data, dispatch);
        } catch (error: any) {
          handleResponse(true, error.error, dispatch);
        }
      },
    }),

    verifyUser: builder.mutation({
      query: (payload) => ({
        url: "users/verifyEmail",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const resp = data;
          console.log("CHECKING resp ==>", resp);
          //   handleResponse(true, data, dispatch);
          handleResponse(false, data, dispatch);
        } catch (error: any) {
          handleResponse(true, error.error, dispatch);
        }
      },
    }),
  }),
});

export const { useLoginUserMutation, useSignUpUserMutation,useVerifyUserMutation } = loginAPI;
