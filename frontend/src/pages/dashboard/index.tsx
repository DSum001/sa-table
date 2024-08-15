import { Col, Row, Card, Statistic, Table } from "antd";

import {

  AuditOutlined,

  UserOutlined,

  PieChartOutlined,

  StockOutlined,

} from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";


interface DataType {

  key: string;

  name: string;

  age: number;

  address: string;

  tags: string[];

}


const columns: ColumnsType<DataType> = [


];


const data: DataType[] = [];

export default function index() {

  const handleCardClick = (url: string) => {

    window.location.href = url;
  };

  return (

    <>

      <Row gutter={[16, 16]}>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>

          <h2>Table</h2>

        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>

          <Card style={{ backgroundColor: "#F5F5F5" }}>

            <Row gutter={[16, 16]}>

              <Col xs={24} sm={24} md={12} lg={12} xl={6}>

                <Card

                  bordered={false}

                  style={{

                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

                  }}
                  onClick={() => handleCardClick('/customer')}

                >

                  <Statistic

                    title="จำนวน"

                    value={"F1"}

                    prefix={<StockOutlined />}

                  />

                </Card>

              </Col>


              <Col xs={24} sm={24} md={12} lg={12} xl={6}>

                <Card

                  bordered={false}

                  style={{

                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

                  }}
                  onClick={() => handleCardClick('/path-to-page1')}

                >

                  <Statistic

                    title="จำนวน"

                    value={"F2"}

                    valueStyle={{ color: "black" }}

                    prefix={<AuditOutlined />}

                  />

                </Card>

              </Col>


              <Col xs={24} sm={24} md={12} lg={12} xl={6}>

                <Card

                  bordered={false}

                  style={{

                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

                  }}

                >

                  <Statistic

                    title="จำนวน"

                    value={"F3"}

                    valueStyle={{ color: "black" }}

                    prefix={<PieChartOutlined />}

                  />

                </Card>

              </Col>


              <Col xs={24} sm={24} md={12} lg={12} xl={6}>

                <Card

                  bordered={false}

                  style={{

                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

                  }}

                >

                  <Statistic

                    title="จำนวน"

                    value={"F4"}

                    valueStyle={{ color: "black" }}

                    prefix={<UserOutlined />}

                  />

                </Card>

              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>

                <Card

                  bordered={false}

                  style={{

                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

                  }}

                >

                  <Statistic

                    title="จำนวน"

                    value={"F5"}

                    prefix={<StockOutlined />}

                  />

                </Card>

              </Col>


              <Col xs={24} sm={24} md={12} lg={12} xl={6}>

                <Card

                  bordered={false}

                  style={{

                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

                  }}

                >

                  <Statistic

                    title="จำนวน"

                    value={"F6"}

                    valueStyle={{ color: "black" }}

                    prefix={<AuditOutlined />}

                  />

                </Card>

              </Col>


              <Col xs={24} sm={24} md={12} lg={12} xl={6}>

                <Card

                  bordered={false}

                  style={{

                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

                  }}

                >

                  <Statistic

                    title="จำนวน"

                    value={"S1"}

                    valueStyle={{ color: "black" }}

                    prefix={<PieChartOutlined />}

                  />

                </Card>

              </Col>


              <Col xs={24} sm={24} md={12} lg={12} xl={6}>

                <Card

                  bordered={false}

                  style={{

                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

                  }}

                >

                  <Statistic

                    title="จำนวน"

                    value={"S2"}

                    valueStyle={{ color: "black" }}

                    prefix={<UserOutlined />}

                  />

                </Card>

              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>

                <Card

                  bordered={false}

                  style={{

                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

                  }}

                >

                  <Statistic

                    title="จำนวน"

                    value={"S3"}

                    prefix={<StockOutlined />}

                  />

                </Card>

              </Col>


              <Col xs={24} sm={24} md={12} lg={12} xl={6}>

                <Card

                  bordered={false}

                  style={{

                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

                  }}

                >

                  <Statistic

                    title="จำนวน"

                    value={"S4"}

                    valueStyle={{ color: "black" }}

                    prefix={<AuditOutlined />}

                  />

                </Card>

              </Col>


              <Col xs={24} sm={24} md={12} lg={12} xl={6}>

                <Card

                  bordered={false}

                  style={{

                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

                  }}

                >

                  <Statistic

                    title="จำนวน"

                    value={"E1"}

                    valueStyle={{ color: "black" }}

                    prefix={<PieChartOutlined />}

                  />

                </Card>

              </Col>


              <Col xs={24} sm={24} md={12} lg={12} xl={6}>

                <Card

                  bordered={false}

                  style={{

                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

                  }}

                >

                  <Statistic

                    title="จำนวน"

                    value={"E2"}

                    valueStyle={{ color: "black" }}

                    prefix={<UserOutlined />}

                  />

                </Card>

              </Col>

            </Row>

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