import { Col, Row, Card, Button, Table, Dropdown, Menu, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, DashOutlined } from "@ant-design/icons";
import { GetBooking } from "../../../services/https"; // Adjust import according to your services file
import { BookingInterface } from "../../../interfaces/Booking";

const columns: ColumnsType<BookingInterface> = [
  { title: 'ID', dataIndex: 'ID', key: 'ID' },
  { title: 'Table Number', dataIndex: 'Table_id', key: 'Table_id', render: (text) => `Table ${text}` },
  { title: 'Number of Customers', dataIndex: 'number_of_customers', key: 'number_of_customer' },
  { title: 'Package', dataIndex: 'Package_id', key: 'Package_id', render: (text) => `Package ${text}` },
  { title: 'Member', dataIndex: 'Member_id', key: 'Member_id', render: (text) => `Member ${text}` },
  { title: 'Employee', dataIndex: 'Employee_id', key: 'Employee_id', render: (text) => `Employee ${text}` },
  {
    title: '',
    key: 'actions',
    
    
  },
];

function TableList() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const handleButtonClick = () => {
    navigate("/table");
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h1 style={{ textAlign: "center" }}>Booking List</h1>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ backgroundColor: "#F5F5F5" }}>
            <Table
              dataSource={bookingData}
              columns={columns}
              pagination={false}
              bordered
              title={() => 'Booking List'}
              loading={loading}
              style={{ marginTop: "20px" }}
              rowKey="ID" // Assuming each booking has a unique ID
            />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
}

export default TableList;
