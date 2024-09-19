import {
  Card,
  Row,
  Col,
  Select,
  Button,
  Form,
  message,
  InputNumber,
} from "antd";
import {
  GetBookingByID,
  UpdateBooking,
  GetSoups,
  GetPackages,
} from "../../../services/https";
import { useState, useEffect } from "react";
import { BookingInterface } from "../../../interfaces/Booking";
import { PackageInterface } from "../../../interfaces/Package";
import { SoupInterface } from "../../../interfaces/Soup";
import { useNavigate, useParams } from "react-router-dom";

function EditBookingTable() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [booking, setBooking] = useState<BookingInterface | null>(null);
  const [soup, setSoup] = useState<SoupInterface[]>([]);
  const [packages, setPackages] = useState<PackageInterface[]>([]);
  const [loadingPackages, setLoadingPackages] = useState<boolean>(true);
  const [tableName, setTableName] = useState<string>("");

  const { id } = useParams();
  const [form] = Form.useForm();

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

  const fetchPackages = async () => {
    setLoadingPackages(true);
    try {
      const res = await GetPackages();
      if (Array.isArray(res)) {
        setPackages(res);
      } else {
        throw new Error("Invalid response format.");
      }
    } catch (error) {
      messageApi.error("Failed to fetch packages.");
    } finally {
      setLoadingPackages(false);
    }
  };

  const fetchBookingById = async () => {
    if (!id) {
      messageApi.error("Invalid booking ID!");
      return;
    }
  
    try {
      const res = await GetBookingByID(id);
      if (res && res.data) {
        setBooking(res.data);
        // ตรวจสอบว่ามีข้อมูล table_id และ table_name หรือไม่
        setTableName(res.data.table?.table_name ?? "N/A"); // ใช้ table_name ที่ถูกต้อง
        form.setFieldsValue({
          phone_number: res.data.phone_number,
          number_of_customer: res.data.number_of_customer,
          SoupID: res.data.SoupID,
          PackageID: res.data.PackageID,
        });
      } else {
        throw new Error("Failed to fetch booking data.");
      }
    } catch (error) {
      messageApi.error("Failed to fetch booking data.");
    }
  };
  

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

  const handleBackButtonClick = () => {
    navigate("/booking/booking_list");
  };

  useEffect(() => {
    fetchSoups();
    fetchPackages();
    fetchBookingById();
  }, [id]);

  return (
    <>
      {contextHolder}
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h1 className="heading-style">Edit Booking for {tableName}</h1> {/* แสดงชื่อโต๊ะที่นี่ */}
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
                    label="Number of Customers"
                    name="number_of_customer"
                    rules={[
                      { required: true, message: "Please enter the number of customers!" },
                      { type: "number", min: 1, max: 10, message: "Number of customers must be between 1 and 10!" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Customers"
                      min={1}
                      max={10}
                      step={1}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Package"
                    name="PackageID"
                    rules={[{ required: true, message: "Please select a package!" }]}
                  >
                    <Select
                      placeholder="Select a package"
                      className="select-style"
                      options={packages.map((pkg) => ({
                        value: pkg.ID,
                        label: pkg.name,
                      }))}
                      loading={loadingPackages}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>{renderSoupFields()}</Row>
              <Row justify="space-between">
                <Col>
                  <Button
                    type="default"
                    onClick={handleBackButtonClick}
                    className="back-button-style"
                  >
                    Back
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="button-style"
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

export default EditBookingTable;