import { Col, Row, Card, Table } from "antd";

import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;

  name: string;

  age: number;

  address: string;

  tags: string[];
}

const columns: ColumnsType<DataType> = [];

const data: DataType[] = [];

export default function index() {

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h2>Table</h2>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ backgroundColor: "#F5F5F5" }}>
            
              
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h3>ผู้ใช้งานล่าสุด</h3>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
}
