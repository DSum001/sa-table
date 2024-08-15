import { Col, Row, Card, Statistic } from "antd";

import { UserOutlined } from "@ant-design/icons";

export default function index() {
  const handleCardClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h1 style={{ textAlign: "center" }}>Table</h1>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ backgroundColor: "#F5F5F5" }}>
            <Row gutter={[16, 16]} justify="center" align="middle">
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                  onClick={() => handleCardClick("/customer")}
                >
                  <Statistic
                    title="จำนวน"
                    value={"F1"}
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
                  onClick={() => handleCardClick("/path-to-page1")}
                >
                  <Statistic
                    title="จำนวน"
                    value={"F2"}
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
                  onClick={() => handleCardClick("/path-to-page1")}
                >
                  <Statistic
                    title="จำนวน"
                    value={"F3"}
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
                  onClick={() => handleCardClick("/path-to-page1")}
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
                  onClick={() => handleCardClick("/path-to-page1")}
                >
                  <Statistic
                    title="จำนวน"
                    value={"F5"}
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
                  onClick={() => handleCardClick("/path-to-page1")}
                >
                  <Statistic
                    title="จำนวน"
                    value={"F6"}
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
                  onClick={() => handleCardClick("/path-to-page1")}
                >
                  <Statistic
                    title="จำนวน"
                    value={"S1"}
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
                  onClick={() => handleCardClick("/path-to-page1")}
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
                  onClick={() => handleCardClick("/path-to-page1")}
                >
                  <Statistic
                    title="จำนวน"
                    value={"S3"}
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
                  onClick={() => handleCardClick("/path-to-page1")}
                >
                  <Statistic
                    title="จำนวน"
                    value={"S4"}
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
                  onClick={() => handleCardClick("/path-to-page1")}
                >
                  <Statistic
                    title="จำนวน"
                    value={"E1"}
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
                  onClick={() => handleCardClick("/path-to-page1")}
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
      </Row>
    </>
  );
}
