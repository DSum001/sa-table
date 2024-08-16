import { Col, Row, Card, Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

// Example data with customer details
const tableData = [
  { key: '1', tableNumber: 'F1', customerName: 'John Doe', soup: 'น้ำใส, น้ำดำ', package: 'หมูและไก่', status: 'Available' },
  { key: '2', tableNumber: 'F2', customerName: 'Jane Smith', soup: 'ซุปหม่าล่า, ซุปทงคัตสึ', package: 'ทะเล', status: 'Reserved' },
  { key: '3', tableNumber: 'F3', customerName: 'Michael Brown', soup: 'น้ำดำ', package: 'เนื้อ', status: 'Available' },

];

const columns = [
  { title: 'Table Number', dataIndex: 'tableNumber', key: 'tableNumber' },
  { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
  { title: 'Soup Selection', dataIndex: 'soup', key: 'soup' },
  { title: 'Package', dataIndex: 'package', key: 'package' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

function TableList() {
  const navigate = useNavigate();

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
              dataSource={tableData}
              columns={columns}
              pagination={false}
              bordered
              title={() => 'Table List'}
              style={{ marginTop: "20px" }}
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
