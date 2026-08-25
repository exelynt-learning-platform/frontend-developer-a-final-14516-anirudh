import { Alert } from "antd";

export default function AppError() {
  return (
    <div className="mx-auto max-w-lg p-6">
      <Alert
        type="error"
        showIcon
        message="Failed to load employees"
        description="Please try again later."
      />
    </div>
  );
}
