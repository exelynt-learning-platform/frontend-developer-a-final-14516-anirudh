import { Table, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import type { Employee } from "../../../types/employee";

interface EmployeeTableProps {
  data: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  loading?: boolean;
}

export default function EmployeeTable({
  data,
  onEdit,
  onDelete,
  loading,
}: EmployeeTableProps) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },

    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },

    {
      title: "Actions",
      key: "actions",

      render: (_: unknown, record: Employee) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            ghost
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        pageSize: 10,
      }}
      scroll={{
        x: true,
      }}
    />
  );
}
