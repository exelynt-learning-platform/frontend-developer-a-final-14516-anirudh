import { Input } from "antd";

interface EmployeeSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EmployeeSearch({
  value,
  onChange,
}: EmployeeSearchProps) {
  return (
    <Input.Search
      size="large"
      placeholder="Search by name, email, mobile, country or ID"
      value={value}
      allowClear
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
