import { Card, Button, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import type { Employee } from "../../../types/employee";

interface EmployeeGridProps {
  data: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export default function EmployeeGrid({
  data,
  onEdit,
  onDelete,
}: EmployeeGridProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {data.map((employee) => (
        <Card key={employee.id} hoverable className="h-full">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{employee.name}</h3>

            <p>
              <strong>Email:</strong> {employee.email}
            </p>

            <p>
              <strong>Mobile:</strong> {employee.mobile}
            </p>

            <Tag color="blue">{employee.country}</Tag>

            <div className="pt-3 flex gap-2">
              <Button
                type="primary"
                ghost
                icon={<EditOutlined />}
                onClick={() => onEdit(employee)}
              >
                Edit
              </Button>

              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => onDelete(employee)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
