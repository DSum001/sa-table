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
  const location = useLocation(); // Get the location object from react-router-dom
  const [form] = Form.useForm();

  // Parse the query parameters to extract the table name
  const queryParams = new URLSearchParams(location.search);
  const tableName = queryParams.get("tableName") || "Unknown Table"; // Default to "Unknown Table" if no name provided

  // State to store the soups and packages fetched from the backend
  const [soups, setSoups] = useState<SoupInterface[]>([]);
  const [packages, setPackages] = useState<PackageInterface[]>([]);
  const [loadingSoups, setLoadingSoups] = useState<boolean>(false);
  const [loadingPackages, setLoadingPackages] = useState<boolean>(false);

  const getSoups = async () => {
    setLoadingSoups(true);
    try {
      const res = await GetSoups(); // Fetch data from the API

      if (res.status === 200) {
        setSoups(res.data); // Set the data from the API response
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
      const res = await GetPackages(); // Fetch data from the API

      if (res.status === 200) {
        setPackages(res.data); // Set the data from the API response
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

  // Define the type for the return value of confirmBooking
  const confirmBooking = async (formValues: any): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Backend booking data:", formValues);
        resolve("Booking confirmed!");
      }, 500); // Mock 2-second delay to simulate API call
    });
  };

  const onFinish = async (values: any) => {
    const { numberOfCustomers, soup1, soup2, soup3, soup4, package: selectedPackage } = values;
    if (numberOfCustomers === 0) {
      message.error("Number of customers must be at least 1!");
      return;
    }
    const selectedSoups = [soup1, soup2, soup3, soup4].filter(soup => soup);
    if (selectedSoups.length !== 2 && selectedSoups.length !== 4) {
      message.error("Please select either 2 or 4 soups!");
      return;
    }

    message.loading("Confirming booking...");
    try {
      // Perform the mock backend action
      const bookingMessage = await confirmBooking(values);
      message.success(bookingMessage);

      // Redirect after successful booking
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
    // Navigate back to the table selection page
    navigate("/table");
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h1 style={headingStyle}>
            Table Booking for {tableName}
          </h1> {/* Display the table name dynamically */}
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
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Soup 1"
                    name="soup1"
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
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Soup 2"
                    name="soup2"
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
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Soup 3"
                    name="soup3"
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
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Soup 4"
                    name="soup4"
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
