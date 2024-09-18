import { useState, useEffect } from "react";
import { BookingInterface } from "../../../interfaces/Booking";
import { PackageInterface } from "../../../interfaces/Package";
import { SoupInterface } from "../../../interfaces/Soup";
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
import {
  GetSoups,
  GetPackages,
  GetBookingByID,
  UpdateBooking,
} from "../../../services/https";
import { useNavigate, useParams } from "react-router-dom";

function EditBookingTable() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [booking, setBooking] = useState<BookingInterface | null>(null);
  const [soup, setSoup] = useState<SoupInterface[]>([]); // Initialize as an array
  const [packages, setPackages] = useState<PackageInterface[]>([]);
  const [loadingPackages, setLoadingPackages] = useState<boolean>(true);
  const [tableName, setTableName] = useState<string>("");

  const { id } = useParams(); // Destructure directly
  const [form] = Form.useForm();

  // Handles form submission
  const onFinish = async (values: BookingInterface) => {
    if (!id) {
      messageApi.error("Invalid booking ID!");
      return;
    }

    try {
      const res = await UpdateBooking(id, values);
      if (res) {
        messageApi.success("Booking updated successfully.");
        setTimeout(() => navigate("/booking/booking_list"), 2000);
      } else {
        throw new Error("Update failed.");
      }
    } catch (error) {
      messageApi.error("An error occurred while updating the booking.");
    }
  };

  // Fetches soups data
  const fetchSoups = async () => {
    try {
      const res = await GetSoups();
      if (Array.isArray(res)) {
        setSoup(res);
      } else {
        throw new Error("Invalid response format.");
      }
    } catch (error) {
      messageApi.error("Failed to fetch soups.");
    }
  };

  // Fetches packages data
  const fetchPackages = async () => {
    try {
      const res = await GetPackages();
      if (Array.isArray(res)) {
        setPackages(res);
        setLoadingPackages(false);
      } else {
        throw new Error("Invalid response format.");
      }
    } catch (error) {
      messageApi.error("Failed to fetch packages.");
    }
  };

  // Fetches booking data by ID
  const fetchBookingById = async () => {
    if (!id) {
      messageApi.error("Invalid booking ID!");
      return;
    }

    try {
      const res = await GetBookingByID(id);
      if (res) {
        setBooking(res);
        setTableName(res.table_name);
        form.setFieldsValue({
          phone_number: res.phone_number,
          number_of_customer: res.number_of_customer,
          SoupID: res.SoupID,
          PackageID: res.PackageID,
        });
      } else {
        throw new Error("Failed to fetch booking data.");
      }
    } catch (error) {
      messageApi.error("Failed to fetch booking data.");
    }
  };

  // Renders soup selection fields
  const renderSoupFields = () => {
    if (soup.length === 0) {
      return <Col xs={24}><p>No soups available.</p></Col>;
    }

    return (
      <Col xs={24} sm={24} md={12}>
        <Form.Item
          label="Soup Selection"
          name="SoupID"
          rules={[{ required: true, message: "Please select a soup!" }]}
        >
          <Select placeholder="Select a soup">
            {soup.map((soupOption) => (
              <Select.Option key={soupOption.ID} value={soupOption.ID}>
                {soupOption.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    );
  };

  // Handles back button click
  const handleBackButtonClick = () => {
    navigate("/booking/booking_list");
  };

  useEffect(() => {
    fetchSoups();
    fetchPackages();
    fetchBookingById();
  }, []);

  return (
    <>
      {contextHolder}
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: "20px" }}>
        <Col xs={24}>
          <h1 className="heading-style">Edit Table Booking for {tableName}</h1>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={16} lg={14} xl={12}>
          <Card className="card-style">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    rules={[
                      { required: true, message: "Please enter your phone number!" },
                      { pattern: /^[0-9]{10}$/, message: "Phone number must be 10 digits!" },
                    ]}
                  >
                    <Input maxLength={10} placeholder="Phone Number" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Number of Customers"
                    name="number_of_customer"
                    rules={[
                      { required: true, message: "Please enter the number of customers!" },
                      { type: "number", min: 1, message: "Number of customers must be at least 1!" },
                    ]}
                  >
                    <InputNumber min={1} placeholder="Customers" style={{ width: "100%" }} />
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
                    name="PackageID"
                    rules={[{ required: true, message: "Please select a package!" }]}
                  >
                    <Select
                      placeholder="Select a package"
                      loading={loadingPackages}
                      options={packages.map((pkg) => ({
                        value: pkg.ID,
                        label: pkg.name,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col>
                  <Button type="default" onClick={handleBackButtonClick}>
                    Back
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit">
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

export default EditBookingTable;
