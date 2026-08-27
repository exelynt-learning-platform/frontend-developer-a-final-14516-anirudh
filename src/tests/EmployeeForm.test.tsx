// src/tests/EmployeeForm.test.tsx
const createEmployeeMock = vi.fn(() => ({
  unwrap: vi.fn().mockResolvedValue({}),
}));

const updateEmployeeMock = vi.fn(() => ({
  unwrap: vi.fn().mockResolvedValue({}),
}));

vi.mock("../services/employeeApi", () => ({
  useCreateEmployeeMutation: () => [createEmployeeMock, { isLoading: false }],

  useUpdateEmployeeMutation: () => [updateEmployeeMock, { isLoading: false }],
}));
import userEvent from "@testing-library/user-event";
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

  it("calls onClose when cancel is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <EmployeeForm
        open={true}
        onClose={onClose}
        employee={null}
        countries={[{ id: "1", country: "India" }]}
      />,
    );

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onClose).toHaveBeenCalled();
  });

  it("shows edit employee title", () => {
    render(
      <EmployeeForm
        open={true}
        onClose={vi.fn()}
        employee={{
          id: "1",
          name: "John",
          email: "john@test.com",
          mobile: "9876543210",
          country: "India",
          state: "Maharashtra",
          district: "Pune",
        }}
        countries={[{ id: "1", country: "India" }]}
      />,
    );

    expect(screen.getByText("Edit Employee")).toBeInTheDocument();
  });

  it("updates employee in edit mode", async () => {
    const user = userEvent.setup();

    render(
      <EmployeeForm
        open={true}
        onClose={vi.fn()}
        employee={{
          id: "1",
          name: "John",
          email: "john@test.com",
          mobile: "9876543210",
          country: "India",
          state: "Maharashtra",
          district: "Pune",
        }}
        countries={[{ id: "1", country: "India" }]}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /update employee/i,
      }),
    );

    expect(updateEmployeeMock).toHaveBeenCalled();
  });

  it("calls onClose when cancel clicked", async () => {
    const user = userEvent.setup();

    const onClose = vi.fn();

    render(
      <EmployeeForm
        open={true}
        onClose={onClose}
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
        name: /cancel/i,
      }),
    );

    expect(onClose).toHaveBeenCalled();
  });
});
