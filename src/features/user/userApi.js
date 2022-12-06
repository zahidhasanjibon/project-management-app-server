import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
        query: (email) => `/users?email=${email}`,
    }),

    getMember:builder.query({
        query:({email,id}) => `/teams?id=${id}&members_like=${email}`
    })

  }),
});

export const {useGetUserQuery ,useGetMemberQuery} = userApi;
