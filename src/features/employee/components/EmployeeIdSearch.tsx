import { useState } from "react";
import { Input, Button, message } from "antd";
import { useLazyGetEmployeeByIdQuery } from "../../../services/employeeApi";
import type { Employee } from "../../../types/employee";

interface EmployeeIdSearchProps {
  onEmployeeFound: (employee: Employee) => void;
  onClear: () => void;
}

export default function EmployeeIdSearch({ onEmployeeFound, onClear }: EmployeeIdSearchProps) {
  const [employeeId, setEmployeeId] = useState("");

  const [searchEmployee, { isFetching }] = useLazyGetEmployeeByIdQuery();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!employeeId.trim()) return;

    try {
      const employee = await searchEmployee(employeeId).unwrap();

      onEmployeeFound(employee);
    } catch {
      message.warning("Employee not found");
    }
  };
  const handleClear = () => {
    setEmployeeId("");
    onClear();
  };
  return (
    <form className="flex gap-2" onSubmit={handleSearch}>
      <Input
        placeholder="Enter Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />

      <Button htmlType="submit" type="primary" loading={isFetching}>
        Search
      </Button>

      {employeeId && <Button onClick={handleClear}>Clear</Button>}
    </form>
  );
}
