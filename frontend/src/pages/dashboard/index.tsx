import { Link } from 'react-router-dom';
import { Card, Table, Col, Row, Statistic, Button } from 'antd';
import { CoffeeOutlined, ShoppingCartOutlined, DollarCircleOutlined } from "@ant-design/icons";

function Receipt() {
  const paths = [
    "/receipt/pay", "/receipt/pay", "/receipt/pay", "/receipt/pay",
    "/receipt/pay", "/receipt/pay", "/receipt/pay", "/receipt/pay",
    "/receipt/pay", "/receipt/pay", "/receipt/pay", "/receipt/pay"
  ];

  const buttonLabels = [
    "Table : F1", "Table : F2", "Table : F3", "Table : F4", "Table : F5",
    "Table : S1", "Table : S2", "Table : S3", "Table : S4", "Table : E1",
    "Table : E2", "Table : E3"
  ];

  const tableseat = [
    ": 1 - 4", ": 1 - 4", ": 1 - 4", ": 1 - 4", ": 1 - 4",
    ": 5 - 6", ": 5 - 6", ": 5 - 6", ": 5 - 6", ": 7 - 8",
    ": 7 - 8", ": 7 - 8"
  ];

  const handleButtonClick = (url: string) => {
    window.location.href = url;
  };

  const buttons = paths.map((path, index) => (
    <Col key={index} xs={24} sm={12} md={8} lg={6} style={{ marginBottom: '16px' }}>
      <Link to={path}>
        <Button
          className="custom-button"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            padding: '10px',
            backgroundColor: '#fff3e6',
            border: '1px solid #ffb3b3'
          }}
        >
          <Statistic
            title={buttonLabels[index]}
            value={tableseat[index]}
            prefix={<CoffeeOutlined />}
            valueStyle={{ fontSize: '16px', color: '#d87c43' }}
          />
        </Button>
      </Link>
    </Col>
  ));

  const columns = [
    { key: 'date_time', title: 'Date Time', dataIndex: 'date_time' },
    { key: 'id', title: 'ID', dataIndex: 'id' },
    { key: 'booking_id', title: 'Booking', dataIndex: 'booking_id' },
    { key: 'total_price', title: 'Total Price', dataIndex: 'total_price' },
    { key: 'coupon', title: 'Coupon', dataIndex: 'coupon' },
    { key: 'member_id', title: 'Member', dataIndex: 'member_id' },
    { key: 'employee_id', title: 'Employee', dataIndex: 'employee_id' },
  ];

  const data = [
    { id: '1', booking_id: 'F1', total_price: 399, coupon: 'DC10', member_id: 'Oat', employee_id: 'Tae', date_time: '10/11/2000' },
    { id: '2', booking_id: 'F2', total_price: 299, coupon: 'DC15', member_id: 'A', employee_id: 'Tae', date_time: '10/11/2000' },
    { id: '3', booking_id: 'F4', total_price: 199, coupon: 'DC20', member_id: 'C', employee_id: 'Tae', date_time: '10/11/2000' },
    { id: '4', booking_id: 'F3', total_price: 299, coupon: 'DC20', member_id: 'D', employee_id: 'Tae', date_time: '10/11/2000' },
    { id: '5', booking_id: 'S1', total_price: 701, coupon: 'DC20', member_id: 'D', employee_id: 'Tae', date_time: '10/11/2000' },
    { id: '6', booking_id: 'S1', total_price: 701, coupon: 'DC20', member_id: 'D', employee_id: 'Tae', date_time: '10/11/2000' },
    { id: '7', booking_id: 'S1', total_price: 701, coupon: 'DC20', member_id: 'D', employee_id: 'Tae', date_time: '10/11/2000' },
    { id: '8', booking_id: 'S1', total_price: 701, coupon: 'DC20', member_id: 'D', employee_id: 'Tae', date_time: '10/11/2000' },
    { id: '9', booking_id: 'S1', total_price: 701, coupon: 'DC20', member_id: 'D', employee_id: 'Tae', date_time: '10/11/2000' },
  ];

  return (
    <Row gutter={[16, 16]}>
      {/* Content Section */}
      <Col span={12}>
        <Card style={{ borderRadius: '20px', width: '100%', height: '30vh', backgroundColor: '#ffe4c4' }}>
          <h3 style={{ marginTop: '-3px', textAlign: 'center', color: '#d87c43' }}>Daily List Summary</h3>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <Card
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  borderRadius: '20px',
                  backgroundColor: '#fff8e1'
                }}
              >
                <Statistic
                  title="Orders"
                  value={5}
                  valueStyle={{ color: "#d87c43" }}
                  prefix={<ShoppingCartOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={7}>
              <Card
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  borderRadius: '20px',
                  backgroundColor: '#fff8e1'
                }}
              >
                <Statistic
                  title="Completed Orders"
                  value={5}
                  valueStyle={{ color: "#d87c43" }}
                  prefix={<CoffeeOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={7}>
              <Card
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  borderRadius: '20px',
                  backgroundColor: '#fff8e1'
                }}
              >
                <Statistic
                  title="Total Revenue"
                  value={1950}
                  valueStyle={{ color: "#d87c43" }}
                  prefix={<DollarCircleOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </Card>
        <Card style={{ borderRadius: '20px', padding: '0px', width: '100%', height: '55vh', backgroundColor: '#fff3e6' }}>
          <h3 style={{ marginTop: '-3px', textAlign: 'center', color: '#d87c43' }}>Receipt History</h3>
          <Table
            dataSource={data}
            columns={columns}
            rowClassName={(_, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
            pagination={{ pageSize: 3 }}
          />
        </Card>
      </Col>
      {/* Button Section */}
      <Col span={12}>
        <Card style={{ borderRadius: '20px', height: '100%', backgroundColor: '#fff3e6' }}>
          <h1 style={{ textAlign: "center", color: '#d87c43' }}>Table</h1>
          <Card style={{ backgroundColor: "#ffe4c4", height: '100%' }}>
            <Row gutter={[16, 16]}>
              {buttons}
            </Row>
          </Card>
        </Card>
      </Col>
    </Row>
  );
}

export default Receipt;
