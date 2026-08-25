import { Empty } from "antd";

export default function EmptyState() {
  return (
    <div className="py-12">
      <Empty description="No Employees Found" />
    </div>
  );
}
