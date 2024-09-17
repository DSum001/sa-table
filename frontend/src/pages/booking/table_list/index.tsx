import { Col, Row, Card, Button, Table, message, } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetBooking, DeleteBookingByID } from "../../../services/https";
import { BookingInterface } from "../../../interfaces/Booking";
import {
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
      // ลบ sorter, filterDropdown, filterIcon ออกไป
    },
    {
      title: "Soups",
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
