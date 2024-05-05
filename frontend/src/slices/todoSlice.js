import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/todo";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveTodo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/save`,
        method: "POST",
        body: data,
      }),
      // Provide tags for this mutation
      providesTags: ["Todo"],

      // Invalidate tags after this mutation succeeds
      invalidatesTags: ["Todo"],
    }),
    listTodo: builder.query({
      query: () => ({
        url: `${USERS_URL}/all`,
        method: "GET",
      }),
      // Provide tags for this query
      providesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/delete`,
        method: "DELETE",
        body: data,
      }),
      // Provide tags for this mutation
    //   providesTags: ["Todo"],

      // Invalidate tags after this mutation succeeds
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const { useSaveTodoMutation, useListTodoQuery, useDeleteTodoMutation } =
  userApiSlice;
