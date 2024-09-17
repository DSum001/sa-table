import { Col, Row, Card, Button, Table, message, Input, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetBooking, DeleteBookingByID } from "../../../services/https";
import { BookingInterface } from "../../../interfaces/Booking";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import '../../../App.css'; // Import the CSS file

const TableList = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBookingData = async () => {
    setLoading(true);
    try {
      const res = await GetBooking();
      if (res.status === 200) {
        setBookingData(res.data);
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

  const handleButtonClick = () => {
    navigate("/booking");
  };

  const handleEdit = (id: number) => {
    navigate(`/booking/edit?bookingId=${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await DeleteBookingByID(id.toString());
      message.success("Booking deleted successfully");
      fetchBookingData();
    } catch (error) {
      message.error("Failed to delete booking");
    }
  };

  const columns: ColumnsType<BookingInterface> = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      sorter: (a, b) => (a.ID ?? 0) - (b.ID ?? 0),
    },
    {
      title: "Table",
      key: "table_id",
      render: (record) => <>{record.table?.table_name ?? "N/A"}</>,
    },
    {
      title: "Number of Customer",
      dataIndex: "number_of_customer",
      key: "number_of_customer",
      sorter: (a, b) =>
        (a.number_of_customer ?? 0) - (b.number_of_customer ?? 0),
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
            onPressEnter={() => confirm?.()}
            className="table-list-input"
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm?.()}
              icon={<SearchOutlined />}
              size="small"
              className="table-list-search-button"
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters?.()}
              size="small"
              className="table-list-reset-button"
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#F57C00" : undefined }} />
      ),
      onFilter: (value, record) =>
        (record.number_of_customer ?? 0).toString().includes(value as string),
    },
    {
      title: "Package",
      key: "package_name",
      render: (record) => <>{record.package?.name ?? "N/A"}</>,
    },
    {
      title: "Employee",
      key: "employee_name",
      render: (record) => <>{record.employee?.first_name ?? "N/A"}</>,
    },
    {
      title: "Soup Selection",
      dataIndex: "soups",
      key: "soups",
      render: (soups) => {
        if (Array.isArray(soups)) {
          return soups.map((soup) => soup.name).join(", ");
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
            className="table-list-edit-button"
          >
            Edit
          </Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.ID ?? 0)}
            className="table-list-delete-button"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="table-list-container">
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <h1 className="table-list-header">Booking List</h1>
        </Col>

        <Col xs={24}>
          <Card className="table-list-card">
            <Table
              dataSource={bookingData}
              columns={columns}
              pagination={false}
              bordered
              title={() => "Booking List"}
              loading={loading}
              className="table-list"
              rowKey="ID"
              rowClassName="custom-row"
            />
          </Card>
        </Col>

        <Col xs={24}>
          <Row justify="center" style={{ marginTop: "20px" }}>
            <Col>
              <Button
                type="primary"
                onClick={handleButtonClick}
                className="table-list-back-button"
              >
                Back to Table Page
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TableList;
