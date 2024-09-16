import { Col, Row, Card, Button, Table, message, Input, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom"; // Ensure correct import
import { useEffect, useState } from "react";
import { GetBooking } from "../../../services/https"; // Adjust import according to your services file
import { BookingInterface } from "../../../interfaces/Booking";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

// Define the columns for the table
const TableList = () => {
  const navigate = useNavigate(); // Initialize navigate here
  const [bookingData, setBookingData] = useState<BookingInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch booking data from the API
  const fetchBookingData = async () => {
    setLoading(true);
    try {
      const res = await GetBooking(); // Fetch data from the API
      if (res.status === 200) {
        setBookingData(res.data); // Set the data from the API response
      } else {
        message.error(res.data.error || "Unable to fetch data");
      }
    } catch (error) {
      message.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  // Navigate back to the booking page
  const handleButtonClick = () => {
    navigate("/booking");
  };

  // Define the handleEdit function
  const handleEdit = (id: number) => {
    // Navigate to the edit page with the booking ID as a query parameter
    navigate(`/booking/edit?bookingId=${id}`);
  };

  // Define the handleDelete function
  const handleDelete = (id: number) => {
    // Implement the delete functionality here
    console.log("Delete booking with ID:", id);
  };

  // Define columns after the functions
  const columns: ColumnsType<BookingInterface> = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      sorter: (a, b) => (a.ID ?? 0) - (b.ID ?? 0), // Handle undefined values
    },

    {
      title: "Table",
      key: "table_id",
      render: (record) => <>{record.table?.table_name ?? "N/A"}</>, // Handle undefined values
    },

    {
      title: "Number of Customer",
      dataIndex: "number_of_customer",
      key: "number_of_customer",
      sorter: (a, b) =>
        (a.number_of_customer ?? 0) - (b.number_of_customer ?? 0), // Handle undefined values
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search number of customers"
            value={selectedKeys[0] as string}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm?.()} // Check if confirm is defined before calling it
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm?.()} // Check if confirm is defined before calling it
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters?.()} // Check if clearFilters is defined before calling it
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        (record.number_of_customer ?? 0).toString().includes(value as string),
    },

    {
      title: "Package",
      key: "package_name",
      render: (record) => <>{record.package?.name ?? "N/A"}</>, // Handle undefined values
    },

    {
      title: "Employee",
      key: "employee_name",
      render: (record) => <>{record.employee?.first_name ?? "N/A"}</>, // Handle undefined values
    },

    {
      title: "Soup Selection",
      dataIndex: "soups",
      key: "soups",
      render: (soups) => {
        if (Array.isArray(soups)) {
          return soups.map((soup) => soup.name).join(", "); // Assuming each soup has a 'name' property
        }
        return "N/A";
      },
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.ID ?? 0)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.ID ?? 0)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <h1 style={{ textAlign: "center" }}>Booking List</h1>
        </Col>

        <Col xs={24}>
          <Card style={{ backgroundColor: "#F5F5F5" }}>
            <Table
              dataSource={bookingData}
              columns={columns}
              pagination={false}
              bordered
              title={() => "Booking List"}
              loading={loading}
              style={{ marginTop: "20px" }}
              rowKey="ID"
            />
          </Card>
        </Col>

        <Col xs={24}>
          <Row justify="center" style={{ marginTop: "20px" }}>
            <Col>
              <Button
                type="primary"
                onClick={handleButtonClick}
                style={{ marginTop: "20px" }}
              >
                Back to Table Page
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default TableList;