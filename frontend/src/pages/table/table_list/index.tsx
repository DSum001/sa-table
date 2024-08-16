import { Col, Row, Card, Statistic, Button, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

function TableList() {
  const [bookingData, setBookingData] = useState<any[]>([]);

  useEffect(() => {
    // Retrieve the booking data from local storage
    const storedData = localStorage.getItem("bookingData");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    }
  }, []);

  const handleButtonClick = (url: string) => {
    window.location.href = url;
  };

  // Define columns for the Ant Design Table component
  const columns = [
    {
      title: 'Table Number',
      dataIndex: 'tableNumber',
      key: 'tableNumber',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Soups',
      dataIndex: 'soups',
      key: 'soups',
      render: (soups: string[]) => soups.join(', '), // Join soups with comma
    },
    {
      title: 'Package',
      dataIndex: 'package',
      key: 'package',
    },
  ];

  // Format booking data for table
  const formattedData = bookingData.map((booking: any, index: number) => ({
    key: index,
    tableNumber: `T${index + 1}`,
    customerName: booking.name,
    soups: [booking.soup1, booking.soup2, booking.soup3, booking.soup4].filter(Boolean), // Filter out any empty soups
    package: booking.package,
  }));

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h1 style={{ textAlign: "center" }}>Table List</h1>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ backgroundColor: "#F5F5F5" }}>
            <Table
              dataSource={formattedData}
              columns={columns}
              pagination={false} // Disable pagination
            />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Row gutter={[16, 16]} justify="center" align="middle">
            {["F1", "F2", "F3", "F4", "F5", "F6", "S1", "S2", "S3", "S4", "E1", "E2"].map((value, index) => (
              <Col key={index} xs={24} sm={24} md={12} lg={12} xl={6}>
                <Button
                  type="default"
                  style={{
                    width: "100%",
                    height: "100px",
                    border: "1px solid #d9d9d9",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                    textAlign: "center",
                    backgroundColor: "#ffffff",
                    transition: "background-color 0.3s, box-shadow 0.3s",
                  }}
                  onClick={() => handleButtonClick("/table/booking")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e6f7ff";
                    e.currentTarget.style.boxShadow = "rgba(100, 100, 111, 0.4) 0px 14px 28px 0px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.boxShadow = "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";
                  }}
                >
                  <Statistic
                    title="Table Number"
                    value={value}
                    prefix={<UserOutlined />}
                  />
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default TableList;
