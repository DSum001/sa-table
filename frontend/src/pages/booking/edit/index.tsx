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
      console.log("Update response:", res); // Log the response for debugging
      if (res && res.status === 200) { // Check for the correct success status
        messageApi.success("Booking updated successfully.");
        setTimeout(() => navigate("/booking/booking_list"), 2000);
      } else {
        throw new Error("Update failed.");
      }
    } catch (error) {
      console.error("Error updating booking:", error); // Log the error
      messageApi.error("An error occurred while updating the booking.");
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
        setTableName(res.data.table?.table_name ?? "N/A");
        form.setFieldsValue({
          number_of_customer: res.data.number_of_customer,
          package_id: res.data.package_id,
          soups: res.data.soups.map((soup: SoupInterface) => soup.ID) || [],
        });
      } else {
        throw new Error("Failed to fetch booking data.");
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
      if (error instanceof Error) {
        messageApi.error("Failed to fetch booking data: " + error.message);
      } else {
        messageApi.error(
          "Failed to fetch booking data: An unknown error occurred."
        );
      }
    }
  };

  const fetchSoups = async () => {
    try {
      const res = await GetSoups(); // Fetch data from the API

      if (res.status === 200) {
        setSoup(res.data); // Set the data from the API response
      } else {
        setSoup([]);
        messageApi.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      setSoup([]);
      messageApi.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await GetPackages(); // Fetch data from the API

      if (res.status === 200) {
        setPackages(res.data); // Set the data from the API response
      } else {
        setPackages([]);
        messageApi.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      setPackages([]);
      messageApi.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  const renderSoupFields = () => {
    if (soup.length === 0) {
      return (
        <Col xs={24}>
          <p>No soups available.</p>
        </Col>
      );
    }

    // Check if booking is not null and has soups
    if (booking?.soups && booking.soups.length > 0) {
      return (
        <>
          {booking.soups.map((soupItem: SoupInterface, index: number) => (
            <Col xs={24} sm={24} md={12} key={index}>
              <Form.Item
                label={`Soup ${index + 1}`}
                name={`soups[${index}]`}
                rules={[{ required: true, message: "Please select a soup!" }]}
              >
                <Select placeholder="Select a soup" defaultValue={soupItem.ID}>
                  {soup.map((soupOption) => (
                    <Select.Option key={soupOption.ID} value={soupOption.ID}>
                      {soupOption.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          ))}
        </>
      );
    }

    return (
      <Col xs={24}>
        <p>No soups selected in this booking.</p>
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
        <Col xs={24}>
          <h1 className="heading-style">Edit Booking for {tableName}</h1>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={16} lg={14} xl={12}>
          <Card className="card-style">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Number of Customers"
                    name="number_of_customer"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the number of customers!",
                      },
                      {
                        type: "number",
                        min: 1,
                        max: 10,
                        message:
                          "Number of customers must be between 1 and 10!",
                      },
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
                    name="package_id"
                    rules={[
                      { required: true, message: "Please select a package!" },
                    ]}
                  >
                    <Select
                      placeholder="Select a package"
                      className="select-style"
                      options={packages.map((pkg) => ({
                        value: pkg.ID,
                        label: pkg.name,
                      }))}
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
