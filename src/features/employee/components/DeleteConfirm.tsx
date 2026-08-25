import { Modal } from "antd";
import type { Employee } from "../../../types/employee";

interface DeleteConfirmProps {
  open: boolean;
  loading?: boolean;
  employee: Employee | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirm({
  open,
  loading,
  employee,
  onCancel,
  onConfirm,
}: DeleteConfirmProps) {
  return (
    <Modal
      title="Delete Employee"
      open={open}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Delete"
      okButtonProps={{
        danger: true,
        loading,
      }}
    >
      <p>
        Are you sure you want to delete <strong>{employee?.name}</strong>?
      </p>
    </Modal>
  );
}
