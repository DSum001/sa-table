import { Col, Row, Card, Button, Table, message, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetBooking, DeleteBookingByID } from "../../../services/https";
import { BookingInterface } from "../../../interfaces/Booking";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function TableList() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>("");

  const fetchBookingData = async () => {
    setLoading(true);
    try {
      const res = await GetBooking();
      console.log(res);
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
    
    // Update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    navigate("/booking");
  };

  const handleEdit = (id: number) => {
    navigate(`/booking/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this booking?",
      onOk: async () => {
        try {
          await DeleteBookingByID(id.toString());
          message.success("Booking deleted successfully");
          fetchBookingData();
        } catch (error) {
          message.error("Failed to delete booking");
        }
      },
    });
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
      title: "Number of Customers",
      dataIndex: "number_of_customer",
      key: "number_of_customer",
    },
    {
      title: "Soups",
      dataIndex: "soups",
      key: "soups",
      render: (soups) =>
        Array.isArray(soups)
          ? soups.map((soup) => soup.name).join(", ")
          : "N/A",
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
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.ID ?? 0)}
            className="table-list-delete-button"
          />
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
          {/* Display the current time */}
          <div style={{ fontSize: "20px", textAlign: "center", marginBottom: "16px" }}>
            Current Time: {currentTime}
          </div>
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
                Back
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default TableList;
