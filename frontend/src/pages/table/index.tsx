import { Col, Row, Card, Statistic, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

function Table() {
  const handleButtonClick = (url: string) => {
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
                      title="table number"
                      value={value}
                      prefix={<UserOutlined />}
                    />
                  </Button>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Table;