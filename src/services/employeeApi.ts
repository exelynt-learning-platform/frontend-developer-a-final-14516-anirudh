import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Employee } from "../types/employee";

export const employeeApi = createApi({
  reducerPath: "employeeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/",
  }),

  tagTypes: ["Employee"],

  endpoints: (builder) => ({
    // Get All Employees
    getEmployees: builder.query<Employee[], void>({
      query: () => "employee",
      providesTags: ["Employee"],
    }),

    // Get Employee By ID
    getEmployeeById: builder.query<Employee, string>({
      query: (id) => `employee/${id}`,
    }),

    // Create Employee
    createEmployee: builder.mutation<Employee, Omit<Employee, "id">>({
      query: (employee) => ({
        url: "employee",
        method: "POST",
        body: employee,
      }),
      invalidatesTags: ["Employee"],
    }),

    // Update Employee
    updateEmployee: builder.mutation<
      Employee,
      { id: string; employee: Partial<Employee> }
    >({
      query: ({ id, employee }) => ({
        url: `employee/${id}`,
        method: "PUT",
        body: employee,
      }),
      invalidatesTags: ["Employee"],
    }),

    // Delete Employee
    deleteEmployee: builder.mutation<void, string>({
      query: (id) => ({
        url: `employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useLazyGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
