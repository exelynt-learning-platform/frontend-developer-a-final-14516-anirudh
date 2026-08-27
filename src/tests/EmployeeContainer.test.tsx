import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import EmployeeContainer from "../features/employee/EmployeeContainer";
import userEvent from "@testing-library/user-event";
vi.mock("../services/employeeApi", () => ({
  useGetEmployeesQuery: vi.fn(),
  useDeleteEmployeeMutation: () => [vi.fn(), { isLoading: false }],
}));

vi.mock("../services/countryApi", () => ({
  useGetCountriesQuery: () => ({
    data: [],
  }),
}));

vi.mock("../components/AppLoader", () => ({
  default: () => <div>Loader</div>,
}));

vi.mock("../components/AppError", () => ({
  default: () => <div>Error</div>,
}));

vi.mock("../components/EmptyState", () => ({
  default: () => <div>Empty State</div>,
}));

vi.mock("../features/employee/components/EmployeeTable", () => ({
  default: ({ onEdit, onDelete, data }: any) => (
    <div>
      <div>Employee Table</div>

      <button onClick={() => onEdit(data[0])}>Edit Employee</button>

      <button onClick={() => onDelete(data[0])}>Delete Employee</button>
    </div>
  ),
}));

vi.mock("../features/employee/components/EmployeeGrid", () => ({
  default: () => <div>Employee Grid</div>,
}));

vi.mock("../features/employee/components/EmployeeForm", () => ({
  default: () => <div>Employee Form</div>,
}));

vi.mock("../features/employee/components/DeleteConfirm", () => ({
  default: () => <div>Delete Confirm</div>,
}));

vi.mock("../features/employee/components/EmployeeIdSearch", () => ({
  default: () => <div>Search</div>,
}));

const { useGetEmployeesQuery } = await import("../services/employeeApi");

describe("EmployeeContainer", () => {
  it("shows loader", () => {
    vi.mocked(useGetEmployeesQuery).mockReturnValue({
      isLoading: true,
    } as never);

    render(<EmployeeContainer />);

    expect(screen.getByText("Loader")).toBeInTheDocument();
  });

  it("shows error", () => {
    vi.mocked(useGetEmployeesQuery).mockReturnValue({
      isLoading: false,
      error: true,
    } as never);

    render(<EmployeeContainer />);

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("shows empty state", () => {
    vi.mocked(useGetEmployeesQuery).mockReturnValue({
      isLoading: false,
      error: null,
      data: [],
    } as never);

    render(<EmployeeContainer />);

    expect(screen.getByText("Empty State")).toBeInTheDocument();
  });

  it("shows table when employees exist", () => {
    vi.mocked(useGetEmployeesQuery).mockReturnValue({
      isLoading: false,
      error: null,
      data: [
        {
          id: "1",
          name: "John",
          email: "john@test.com",
          mobile: "9999999999",
          country: "India",
          state: "Maharashtra",
          district: "Pune",
        },
      ],
    } as never);

    render(<EmployeeContainer />);

    expect(screen.getByText("Employee Table")).toBeInTheDocument();
  });

  it("opens edit form when edit clicked", async () => {
    const user = userEvent.setup();

    vi.mocked(useGetEmployeesQuery).mockReturnValue({
      isLoading: false,
      error: null,
      data: [
        {
          id: "1",
          name: "John",
          email: "john@test.com",
          mobile: "9999999999",
          country: "India",
          state: "Maharashtra",
          district: "Pune",
        },
      ],
    } as never);

    render(<EmployeeContainer />);

    await user.click(screen.getByText("Edit Employee"));

    expect(screen.getByText("Employee Form")).toBeInTheDocument();
  });

  it("opens delete confirm when delete clicked", async () => {
    const user = userEvent.setup();

    vi.mocked(useGetEmployeesQuery).mockReturnValue({
      isLoading: false,
      error: null,
      data: [
        {
          id: "1",
          name: "John",
          email: "john@test.com",
          mobile: "9999999999",
          country: "India",
          state: "Maharashtra",
          district: "Pune",
        },
      ],
    } as never);

    render(<EmployeeContainer />);

    await user.click(screen.getByText("Delete Employee"));

    expect(screen.getByText("Delete Confirm")).toBeInTheDocument();
  });

  it("opens form when add employee clicked", async () => {
    const user = userEvent.setup();

    vi.mocked(useGetEmployeesQuery).mockReturnValue({
      isLoading: false,
      error: null,
      data: [
        {
          id: "1",
          name: "John",
        },
      ],
    } as never);

    render(<EmployeeContainer />);

    await user.click(
      screen.getByRole("button", {
        name: /add employee/i,
      }),
    );

    expect(screen.getByText("Employee Form")).toBeInTheDocument();
  });
});
