import { Card, Row, Col, Input, Select, Button, Form, InputNumber } from "antd";
import { useState } from "react";

function EditBookingTable() {
  const [form] = Form.useForm();

  // Static data
  const soups = [
    { ID: 1, name: "Tomato Soup" },
    { ID: 2, name: "Chicken Soup" },
    { ID: 3, name: "Mushroom Soup" },
    { ID: 4, name: "Beef Soup" },
  ];

  const packages = [
    { ID: 1, name: "Standard Package" },
    { ID: 2, name: "Deluxe Package" },
    { ID: 3, name: "Premium Package" },
  ];

  const tables = [
    { ID: 1, table_capacity_id: 1 },
    { ID: 2, table_capacity_id: 2 },
    { ID: 3, table_capacity_id: 4 },
  ];

  const tableId = 1; // Static table ID
  const tableName = "Table 1";

  const renderSoupFields = () => {
    const table = tables.find((t) => t.ID === tableId);
    const numberOfSoups = table?.table_capacity_id === 1 ? 2 : 4;

    return Array.from({ length: numberOfSoups }, (_, i) => (
      <Col xs={24} sm={24} md={12} key={`soup${i + 1}`}>
        <Form.Item
          label={`Soup ${i + 1}`}
          name={`soup${i + 1}`}
          rules={[{ required: true, message: "Please select a soup!" }]}
        >
          <Select placeholder="Select a soup" className="select-style">
            {soups.map((soup) => (
              <Select.Option key={soup.ID} value={soup.ID}>
                {soup.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    ));
  };

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Here you would handle form submission
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleBackButtonClick = () => {
    // Navigate to the previous page or desired location
    console.log("Back button clicked");
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h1 className="heading-style">Edit Booking for {tableName}</h1>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={16} lg={14} xl={12}>
          <Card className="card-style">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{ table_id: tableId }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      { required: true, message: "Please enter your name!" },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Number of Customers"
                    name="number_of_customer"
                    rules={[
                      {
                        required: true,
                        message: "Please enter number of customers!",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      placeholder="Number of customers"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Package"
                    name="package_id"
                    rules={[
                      { required: true, message: "Please select a package!" },
                    ]}
                  >
                    <Select
                      placeholder="Select a package"
                      className="select-style"
                    >
                      {packages.map((pkg) => (
                        <Select.Option key={pkg.ID} value={pkg.ID}>
                          {pkg.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                {renderSoupFields()}
                <Col xs={24} sm={24} md={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button
                      type="default"
                      onClick={handleBackButtonClick}
                      style={{ marginLeft: "8px" }}
                    >
                      Back
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

export default EditBookingTable;
