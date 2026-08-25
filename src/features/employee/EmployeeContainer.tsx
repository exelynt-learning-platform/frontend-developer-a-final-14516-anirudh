import { motion } from "framer-motion";
import { Button, message, Segmented, Typography } from "antd";
import {
  AppstoreOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import EmployeeTable from "./components/EmployeeTable";

import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "../../services/employeeApi";

import AppLoader from "../../components/AppLoader";
import AppError from "../../components/AppError";
import EmptyState from "../../components/EmptyState";
import { useGetCountriesQuery } from "../../services/countryApi";
import { useMemo, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import type { Employee } from "../../types/employee";
import DeleteConfirm from "./components/DeleteConfirm";
import EmployeeIdSearch from "./components/EmployeeIdSearch";
import EmployeeGrid from "./components/EmployeeGrid";

const { Title, Text } = Typography;

export default function EmployeeContainer() {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();
  const [deleteEmployee, { isLoading: isDeleting }] =
    useDeleteEmployeeMutation();
  const { data: countries = [] } = useGetCountriesQuery();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [searchedEmployeeId, setSearchedEmployeeId] = useState<string | null>(
    null,
  );
  
  const searchedEmployee = useMemo(() => {
    if (!searchedEmployeeId) return null;

    return (
      employees?.find((employee) => employee.id === searchedEmployeeId) || null
    );
  }, [employees, searchedEmployeeId]);

  const tableData = searchedEmployee ? [searchedEmployee] : employees || [];

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setDrawerOpen(true);
  };
  const handleDelete = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setDeleteOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!employeeToDelete?.id) return;

    try {
      if (employeeToDelete.id === searchedEmployeeId) {
        setSearchedEmployeeId(null);
      }
      await deleteEmployee(employeeToDelete.id).unwrap();

      message.success("Employee deleted successfully");

      setDeleteOpen(false);
      setEmployeeToDelete(null);
    } catch {
      message.error("Failed to delete employee");
    }
  };
  if (isLoading) return <AppLoader />;

  if (error) return <AppError />;

  return (
    <div className="min-h-screen max-h-screen bg-slate-50">
      <div className="max-h-screen overflow-y-auto flex flex-col mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Title level={2} className="mb-1!">
            Employee Management
          </Title>

          <Text type="secondary">
            Manage employees, search records and maintain employee information.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <EmployeeIdSearch
            onEmployeeFound={(employee) => setSearchedEmployeeId(employee.id!)}
            onClear={() => setSearchedEmployeeId(null)}
          />
          <div className="flex justify-end gap-2">
            <Segmented
              value={viewMode}
              onChange={(value) => setViewMode(value as "table" | "grid")}
              options={[
                {
                  value: "table",
                  icon: <UnorderedListOutlined />,
                },
                {
                  value: "grid",
                  icon: <AppstoreOutlined />,
                },
              ]}
            />
            <Button
              size="large"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingEmployee(null);
                setDrawerOpen(true);
              }}
            >
              Add Employee
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-h-screen overflow-y-auto  flex flex-col rounded-2xl bg-white p-4 shadow-sm"
        >
          {!employees?.length ? (
            <EmptyState />
          ) : (
            <>
              {viewMode === "table" ? (
                <EmployeeTable
                  data={tableData}
                  loading={isLoading}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ) : (
                <EmployeeGrid
                  data={tableData}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </>
          )}
        </motion.div>
      </div>
      <EmployeeForm
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        employee={editingEmployee}
        countries={countries}
      />
      <DeleteConfirm
        open={deleteOpen}
        loading={isDeleting}
        employee={employeeToDelete}
        onCancel={() => {
          setDeleteOpen(false);
          setEmployeeToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
