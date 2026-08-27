import { describe, it, expect } from "vitest";
import { employeeApi } from "../services/employeeApi";

describe("employeeApi", () => {
  it("has getEmployees endpoint", () => {
    expect(employeeApi.endpoints.getEmployees).toBeDefined();
  });

  it("has getEmployeeById endpoint", () => {
    expect(employeeApi.endpoints.getEmployeeById).toBeDefined();
  });

  it("has createEmployee endpoint", () => {
    expect(employeeApi.endpoints.createEmployee).toBeDefined();
  });

  it("has updateEmployee endpoint", () => {
    expect(employeeApi.endpoints.updateEmployee).toBeDefined();
  });

  it("has deleteEmployee endpoint", () => {
    expect(employeeApi.endpoints.deleteEmployee).toBeDefined();
  });
});
