import { Button, Card, Form, Input, message, Flex, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { TableInterface } from "../../../interfaces/table";
// import logo from "../../../assets/logo.png";

function TableBooking() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    return (
    <>
        {contextHolder}
        <div className="container">
        <div className="sidebar">
            {/* <img src={logo} alt="logo" className="sidebar-logo" /> */}
            <ul className="sidebar-menu">
            <li onClick={() => navigate("/customer")}>👤 customer</li>
            <li onClick={() => navigate("/table")}>🍽️ table</li>
            <li onClick={() => navigate("/orders")}>📦 orders</li>
            <li onClick={() => navigate("/receipt")}>🧾 receipt</li>
            <li onClick={() => navigate("/stocks")}>🍲 stocks</li>
            <li onClick={() => navigate("/employee")}>👨‍💼 employee</li>
            </ul>
        </div>
        <div className="content">
            <Flex justify="center" align="center" className="seat-selection">
            <Card className="card-login" style={{ width: 500 }}>
                <Row align={"middle"} justify={"center"} style={{ height: "400px" }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form
                    name="basic"
                    autoComplete="off"
                    layout="vertical"
                    >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                        { required: true, message: "Please input your email!" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        { required: true, message: "Please input your password!" },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={{ marginBottom: 20 }}
                        >
                        Log in
                        </Button>
                        Or <a onClick={() => navigate("/signup")}>signup now!</a>
                    </Form.Item>
                    </Form>
                </Col>
                </Row>
            </Card>
            </Flex>
            <div className="seat-grid">
            <div className="seat" onClick={() => messageApi.info("F1 clicked!")}>F1</div>
            <div className="seat" onClick={() => messageApi.info("F2 clicked!")}>F2</div>
            <div className="seat" onClick={() => messageApi.info("F3 clicked!")}>F3</div>
            <div className="seat" onClick={() => messageApi.info("F4 clicked!")}>F4</div>
            <div className="seat" onClick={() => messageApi.info("F5 clicked!")}>F5</div>
            <div className="seat" onClick={() => messageApi.info("F6 clicked!")}>F6</div>
            <div className="seat" onClick={() => messageApi.info("S1 clicked!")}>S1</div>
            <div className="seat" onClick={() => messageApi.info("S2 clicked!")}>S2</div>
            <div className="seat" onClick={() => messageApi.info("S3 clicked!")}>S3</div>
            <div className="seat" onClick={() => messageApi.info("S4 clicked!")}>S4</div>
            <div className="seat" onClick={() => messageApi.info("E1 clicked!")}>E1</div>
            <div className="seat" onClick={() => messageApi.info("E2 clicked!")}>E2</div>
            </div>
        </div>
        </div>
    </>
    );
}

export default TableBooking;