import {
    Card,
    Row,
    Col,
    Input,
    Select,
    Button,
    Form,
    message,
    InputNumber,
  } from "antd";
  import { useNavigate } from "react-router-dom";
  import { CSSProperties } from "react";
  
  const { Option } = Select;
  
  const selectStyle: CSSProperties = {
    width: "100%",
    borderRadius: "4px",
    borderColor: "#d9d9d9",
  };
  
  const cardStyle: CSSProperties = {
    backgroundColor: "#F5F5F5",
    padding: "20px",
    borderRadius: "8px",
  };
  
  function TableBooking() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
  
    const onFinish = (values: any) => {
      console.log("Form values: ", values);
      message.success("Booking confirmed!");
      navigate("/booking/table_list"); // Navigate to table_list
    };
  
    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
      message.error("Please correct the errors in the form!");
    };
  
    return (
      <>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
              Table Booking
            </h1>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card style={cardStyle}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Row gutter={[16, 16]} justify="center">
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        { required: true, message: "Please enter your name!" },
                      ]}
                    >
                      <Input placeholder="Enter your name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                      label="Number of Customers"
                      name="numberOfCustomers"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the number of customers!",
                        },
                        {
                          type: "number",
                          min: 1,
                          message: "Number of customers cannot be 0 or less!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter the number of customers"
                        min={1}
                        step={1}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]} justify="center">
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                      label="Package"
                      name="package"
                      rules={[
                        { required: true, message: "Please select a package!" },
                      ]}
                    >
                      <Select placeholder="Select a package" style={selectStyle}>
                        <Option value="package1">หมูและไก่</Option>
                        <Option value="package2">ทะเล</Option>
                        <Option value="package3">เนื้อ</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                      label="Soup 1"
                      name="soup1"
                      rules={[
                        { required: true, message: "Please select a soup!" },
                      ]}
                    >
                      <Select placeholder="Select a soup" style={selectStyle}>
                        <Option value="clear">น้ำใส</Option>
                        <Option value="dark">น้ำดำ</Option>
                        <Option value="mala">ซุปหม่าล่า</Option>
                        <Option value="tonkotsu">ซุปทงคัตสึ</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]} justify="center">
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                      label="Soup 2"
                      name="soup2"
                      rules={[
                        { required: true, message: "Please select a soup!" },
                      ]}
                    >
                      <Select placeholder="Select a soup" style={selectStyle}>
                        <Option value="clear">น้ำใส</Option>
                        <Option value="dark">น้ำดำ</Option>
                        <Option value="mala">ซุปหม่าล่า</Option>
                        <Option value="tonkotsu">ซุปทงคัตสึ</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                      label="Soup 3"
                      name="soup3"
                      rules={[
                        { required: true, message: "Please select a soup!" },
                      ]}
                    >
                      <Select placeholder="Select a soup" style={selectStyle}>
                        <Option value="clear">น้ำใส</Option>
                        <Option value="dark">น้ำดำ</Option>
                        <Option value="mala">ซุปหม่าล่า</Option>
                        <Option value="tonkotsu">ซุปทงคัตสึ</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]} justify="center">
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                      label="Soup 4"
                      name="soup4"
                      rules={[
                        { required: true, message: "Please select a soup!" },
                      ]}
                    >
                      <Select placeholder="Select a soup" style={selectStyle}>
                        <Option value="clear">น้ำใส</Option>
                        <Option value="dark">น้ำดำ</Option>
                        <Option value="mala">ซุปหม่าล่า</Option>
                        <Option value="tonkotsu">ซุปทงคัตสึ</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginTop: "20px" }}
                      >
                        Confirm
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
  
  export default TableBooking;
  