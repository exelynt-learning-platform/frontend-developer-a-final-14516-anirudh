import { useEffect } from "react";
import { Drawer, Form, Input, Button, Select, Space, message } from "antd";
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../../../services/employeeApi";
import type { Employee } from "../../../types/employee";

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  employee?: Employee | null;
  countries: {
    id: string;
    country: string;
  }[];
}

const STATES = [
  "Maharashtra",
  "Karnataka",
  "Delhi",
  "Uttar Pradesh",
  "Tamil Nadu",
  "Gujarat",
];

const DISTRICTS = {
  Maharashtra: ["Pune", "Mumbai", "Nagpur"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubli"],
  Delhi: ["New Delhi", "North Delhi", "South Delhi"],
  "Uttar Pradesh": ["Noida", "Lucknow", "Kanpur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
};

export default function EmployeeForm({
  open,
  onClose,
  employee,
  countries,
}: EmployeeFormProps) {
  const [form] = Form.useForm();

  const [createEmployee, { isLoading: isCreating }] =
    useCreateEmployeeMutation();

  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  const selectedState = Form.useWatch("state", form);

  useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        name: employee.name,
        email: employee.email,
        mobile: employee.mobile,
        country: employee.country,
        countryId: employee.countryId,
        state: employee.state,
        district: employee.district,
      });
    } else {
      form.resetFields();
    }
  }, [employee, form, open]);

  const handleSubmit = async (values: Employee) => {
    try {
      const selectedCountry = countries.find(
        (country) => country.country === values.country,
      );

      const payload = {
        ...values,
        countryId: selectedCountry?.id,
      };

      if (employee?.id) {
        await updateEmployee({
          id: employee.id,
          employee: payload,
        }).unwrap();

        message.success("Employee updated successfully");
      } else {
        await createEmployee(payload).unwrap();

        message.success("Employee created successfully");
      }

      form.resetFields();
      onClose();
    } catch {
      message.error("Something went wrong");
    }
  };

  return (
    <Drawer
      title={employee ? "Edit Employee" : "Add Employee"}
      open={open}
      onClose={onClose}
      width={520}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Name is required",
            },
            {
              whitespace : true,
              message: "Name is required",
            },
            {
              min: 3,
              message: "Minimum 3 characters",
            },
            {
              max: 50,
              message: "Maximum 50 characters",
            },
          ]}
        >
          <Input size="large" placeholder="Enter employee name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email is required",
            },
            {
              type: "email",
              message: "Enter valid email",
            },
          ]}
        >
          <Input size="large" placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[
            {
              required: true,
              message: "Mobile is required",
            },
            {
              pattern: /^[0-9]{10,15}$/,
              message: "Enter valid mobile number",
            },
          ]}
        >
          <Input size="large" placeholder="Enter mobile number" />
        </Form.Item>

        <Form.Item
          label="Country"
          name="country"
          rules={[
            {
              required: true,
              message: "Country is required",
            },
          ]}
        >
          <Select
            size="large"
            placeholder="Select Country"
            showSearch
            options={countries.map((country) => ({
              value: country.country,
              label: country.country,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          rules={[
            {
              required: true,
              message: "State is required",
            },
          ]}
        >
          <Select
            size="large"
            placeholder="Select State"
            options={STATES.map((state) => ({
              value: state,
              label: state,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="District"
          name="district"
          rules={[
            {
              required: true,
              message: "District is required",
            },
          ]}
        >
          <Select
            size="large"
            placeholder="Select District"
            disabled={!selectedState}
            options={(
              DISTRICTS[selectedState as keyof typeof DISTRICTS] || []
            ).map((district) => ({
              value: district,
              label: district,
            }))}
          />
        </Form.Item>

        <Space className="w-full justify-end">
          <Button onClick={onClose}>Cancel</Button>

          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating || isUpdating}
          >
            {employee ? "Update Employee" : "Create Employee"}
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
}
