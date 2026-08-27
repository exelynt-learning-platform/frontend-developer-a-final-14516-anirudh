// src/tests/EmployeeForm.test.tsx

vi.mock("../services/employeeApi", () => ({
  useCreateEmployeeMutation: () => [vi.fn(), { isLoading: false }],
  useUpdateEmployeeMutation: () => [vi.fn(), { isLoading: false }],
}));
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EmployeeForm from "../features/employee/components/EmployeeForm";

describe("EmployeeForm", () => {
  it("renders add employee form", () => {
    render(
      <EmployeeForm
        open={true}
        onClose={vi.fn()}
        employee={null}
        countries={[
          {
            id: "1",
            country: "India",
          },
        ]}
      />,
    );

    expect(screen.getByText("Add Employee")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter employee name"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter mobile number"),
    ).toBeInTheDocument();
  });
});

import userEvent from "@testing-library/user-event";

it("shows validation errors on empty submit", async () => {
  const user = userEvent.setup();

  render(
    <EmployeeForm
      open={true}
      onClose={vi.fn()}
      employee={null}
      countries={[
        {
          id: "1",
          country: "India",
        },
      ]}
    />,
  );

  await user.click(
    screen.getByRole("button", {
      name: /create employee/i,
    }),
  );

  expect(await screen.findByText("Name is required")).toBeInTheDocument();
  expect(await screen.findByText("Email is required")).toBeInTheDocument();
  expect(await screen.findByText("Mobile is required")).toBeInTheDocument();
});

it("prefills employee data in edit mode", () => {
  render(
    <EmployeeForm
      open={true}
      onClose={vi.fn()}
      employee={{
        id: "1",
        name: "John Doe",
        email: "john@test.com",
        mobile: "9876543210",
        country: "India",
        state: "Maharashtra",
        district: "Pune",
      }}
      countries={[
        {
          id: "1",
          country: "India",
        },
      ]}
    />,
  );

  expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
  expect(screen.getByDisplayValue("john@test.com")).toBeInTheDocument();
});