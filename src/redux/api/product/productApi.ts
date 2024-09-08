import { baseApi } from "../../api/baseApi";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: () => {
                return {
                    url: '/auth/manage',
                    method: "GET",
                }

            },
            providesTags: ['product']
        }),
        // create product
        createProduct: builder.mutation({
            query: (data) => {
                return {
                    url: '/auth/create',
                    method: "POST",
                    body: data
                }

            },
            invalidatesTags: ['product']
        }),
        // update product
        updateProduct: builder.mutation({
            query: (data) => {
                return {
                    url: `/auth/update/${data.id}`,
                    method: "PUT",
                    body: data.data
                }

            },
            invalidatesTags: ['product']
        }),
        // delete product
        deleteProduct: builder.mutation({
            query: (id) => {
                return {
                    url: `/auth/delete/${id}`,
                    method: "DELETE"
                }

            },
            invalidatesTags: ['product']
        }),


    })
})

export const { useGetAllProductQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApi;