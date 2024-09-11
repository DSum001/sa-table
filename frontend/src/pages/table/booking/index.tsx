import { Card, Row, Col, Input, Select, Button, Form, message, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { GetSoups, GetPackages } from "../../../services/https";
import { SoupInterface } from "../../../interfaces/Soup";
import { PackageInterface } from "../../../interfaces/Package";
import { useNavigate, useLocation } from "react-router-dom";
import { CSSProperties } from "react";

const { Option } = Select;

const selectStyle: CSSProperties = {
  width: "100%",
  borderRadius: "8px",
  borderColor: "#dcdcdc",
  color: "#333",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const cardStyle: CSSProperties = {
  backgroundColor: "#F5F5F5",
  padding: "24px",
  borderRadius: "12px",
  border: "1px solid #f0f0f0",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const buttonStyle: CSSProperties = {
  marginTop: "20px",
  backgroundColor: "#FF7F50", // Coral color
  borderColor: "#FF7F50",
  color: "#ffffff",
  borderRadius: "8px",
  fontWeight: "bold",
};

const backButtonStyle: CSSProperties = {
  marginTop: "20px",
  backgroundColor: "#6c757d",
  borderColor: "#6c757d",
  color: "#ffffff",
  borderRadius: "8px",
  fontWeight: "bold",
};

const headingStyle: CSSProperties = {
  textAlign: "center",
  color: "#FF7F50", // Coral color
  fontWeight: "bold",
};

function CreateBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  const queryParams = new URLSearchParams(location.search);
  const tableCapacityId = queryParams.get("tableCapacityId"); // Update to match URL parameter name
  const tableName = queryParams.get("tableName") || "Unknown Table";

  const [soups, setSoups] = useState<SoupInterface[]>([]);
  const [packages, setPackages] = useState<PackageInterface[]>([]);
  const [loadingSoups, setLoadingSoups] = useState<boolean>(false);
  const [loadingPackages, setLoadingPackages] = useState<boolean>(false);

  const getSoups = async () => {
    setLoadingSoups(true);
    try {
      const res = await GetSoups();
      if (res.status === 200) {
        setSoups(res.data);
      } else {
        setSoups([]);
        message.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      setSoups([]);
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoadingSoups(false);
    }
  };

  const getPackages = async () => {
    setLoadingPackages(true);
    try {
      const res = await GetPackages();
      if (res.status === 200) {
        setPackages(res.data);
      } else {
        setPackages([]);
        message.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      setPackages([]);
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoadingPackages(false);
    }
  };

  useEffect(() => {
    getSoups();
    getPackages();
  }, []);

  const confirmBooking = async (formValues: any): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Backend booking data:", formValues);
        resolve("Booking confirmed!");
      }, 500);
    });
  };

  const onFinish = async (values: any) => {
    const { numberOfCustomers, soup1, soup2, soup3, soup4, package: selectedPackage } = values;
    if (numberOfCustomers === 0) {
      message.error("Number of customers must be at least 1!");
      return;
    }

    const selectedSoups = [soup1, soup2, soup3, soup4].filter(soup => soup);
    const requiredSoupCount = tableCapacityId === '1' ? 2 : 4;

    if (selectedSoups.length !== requiredSoupCount) {
      message.error(`Please select ${requiredSoupCount} soups!`);
      return;
    }

    message.loading("Confirming booking...");
    try {
      const bookingMessage = await confirmBooking(values);
      message.success(bookingMessage);
      navigate("/table/table_list");
    } catch (error) {
      message.error("Booking failed! Please try again.");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Please correct the errors in the form!");
  };

  const handleBackButtonClick = () => {
    navigate("/table");
  };

  const renderSoupFields = () => {
    const numberOfSoups = tableCapacityId === '1' ? 2 : 4;
    const soupFields = [];
    for (let i = 1; i <= numberOfSoups; i++) {
      soupFields.push(
        <Col xs={24} sm={24} md={12} key={`soup${i}`}>
          <Form.Item
            label={`Soup ${i}`}
            name={`soup${i}`}
            rules={[{ required: true, message: "Please select a soup!" }]}
          >
            <Select 
              placeholder="Select a soup" 
              style={selectStyle}
              options={soups.map(soup => ({
                value: soup.ID,
                label: soup.name,
              }))}
              loading={loadingSoups}
            />
          </Form.Item>
        </Col>
      );
    }
    return soupFields;
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h1 style={headingStyle}>
            Table Booking for {tableName}
          </h1>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={16} lg={14} xl={12}>
          <Card style={cardStyle}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter your name!" }]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Number of Customers"
                    name="numberOfCustomers"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the number of customers!",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Customers"
                      min={1}
                      step={1}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                {renderSoupFields()}
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Package"
                    name="package"
                    rules={[{ required: true, message: "Please select a package!" }]}
                  >
                    <Select
                      placeholder="Select a package"
                      style={selectStyle}
                      options={packages.map(pkg => ({
                        value: pkg.ID,
                        label: pkg.name,
                      }))}
                      loading={loadingPackages}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col>
                  <Button
                    type="default"
                    onClick={handleBackButtonClick}
                    style={backButtonStyle}
                  >
                    Back
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={buttonStyle}
                  >
                    Confirm
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CreateBooking;