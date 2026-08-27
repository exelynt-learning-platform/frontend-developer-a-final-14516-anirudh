import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import EmployeeGrid from "../features/employee/components/EmployeeGrid";

describe("EmployeeGrid", () => {
  const employee = {
    id: "1",
    name: "John Doe",
    email: "john@test.com",
    mobile: "9876543210",
    country: "India",
    state: "Maharashtra",
    district: "Pune",
  };

  it("renders employee card", () => {
    render(
      <EmployeeGrid data={[employee]} onEdit={vi.fn()} onDelete={vi.fn()} />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
  });

  it("calls edit handler", async () => {
    const onEdit = vi.fn();

    render(
      <EmployeeGrid data={[employee]} onEdit={onEdit} onDelete={vi.fn()} />,
    );

    await userEvent.click(screen.getByRole("button", { name: /edit/i }));

    expect(onEdit).toHaveBeenCalledWith(employee);
  });

  it("calls delete handler", async () => {
    const onDelete = vi.fn();

    render(
      <EmployeeGrid data={[employee]} onEdit={vi.fn()} onDelete={onDelete} />,
    );

    await userEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(onDelete).toHaveBeenCalledWith(employee);
  });
});
