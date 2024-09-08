import { baseApi } from "../../api/baseApi";

export const authApi=baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        login: builder.mutation({
            query: (userData) => ({
                url: '/auth/login',
                method: "POST",
                body: userData
            }),
            invalidatesTags:['product']
        }),
        
     
    })
})

export const {useLoginMutation}=authApi;