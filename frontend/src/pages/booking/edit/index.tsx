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
  UpdateBookingSoups,
} from "../../../services/https";
import { useState, useEffect } from "react";
import { BookingInterface } from "../../../interfaces/Booking";
import { BookingSoupInterface } from "../../../interfaces/BookingSoup";
import { SoupInterface } from "../../../interfaces/Soup";
import { PackageInterface } from "../../../interfaces/Package";
import { useNavigate, useParams } from "react-router-dom";
import "../create/booking.css";

function EditBookingTable() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [booking, setBooking] = useState<BookingInterface | null>(null);
  const [soups, setSoups] = useState<SoupInterface[]>([]);
  const [packages, setPackages] = useState<PackageInterface[]>([]);
  const [tableName, setTableName] = useState<string>("");
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    if (!id) {
      messageApi.error("Invalid booking ID!");
      return;
    }

    const selectedSoups = values.soups || [];
    if (selectedSoups.length < 2 || selectedSoups.length > 4) {
      messageApi.error("Please select between 2 and 4 soups!");
      return;
    }

    setLoading(true);
    try {
      const res = await UpdateBooking(id, {
        number_of_customer: values.number_of_customer,
        package_id: values.package_id,
      });

      if (res && res.status === 200) {
        messageApi.success("Booking updated successfully.");

        // Prepare soup data as an array
        const soupData: BookingSoupInterface[] = selectedSoups.map(
          (soupId: number) => ({
            BookingID: Number(id), // BookingID is required
            SoupID: soupId, // SoupID is required
          })
        );

        // Log the soup data to console
        console.log("Sending soup data:", soupData);

        // Send the soup data to the backend
        const soupRes = await UpdateBookingSoups(String(id), soupData);
        if (soupRes && soupRes.status === 200) {
          messageApi.success("Soups updated successfully.");
        } else {
          messageApi.error("Failed to update soups.");
        }

        setTimeout(() => navigate("/booking/booking_list"), 2000);
      } else {
        throw new Error("Update failed.");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      messageApi.error("An error occurred while updating the booking.");
    } finally {
      setLoading(false);
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
      const errorMessage =
        (error as Error).message || "An unknown error occurred.";
      console.error("Error fetching booking data:", error);
      messageApi.error("Failed to fetch booking data: " + errorMessage);
    }
  };

  const fetchSoups = async () => {
    try {
      const res = await GetSoups();
      if (res.status === 200) {
        setSoups(res.data);
      } else {
        setSoups([]);
        messageApi.error(res.data.error || "Cannot fetch soups.");
      }
    } catch (error) {
      setSoups([]);
      messageApi.error("Error fetching soups.");
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await GetPackages();
      if (res.status === 200) {
        setPackages(res.data);
      } else {
        setPackages([]);
        messageApi.error(res.data.error || "Cannot fetch packages.");
      }
    } catch (error) {
      setPackages([]);
      messageApi.error("Error fetching packages.");
    }
  };

  const renderSoupFields = () => {
    const bookingSoupIDs = booking?.soups || [];

    if (bookingSoupIDs.length === 0) {
      return (
        <Col xs={24}>
          <p>No soups available for this booking.</p>
        </Col>
      );
    }

    return (
      <>
        {bookingSoupIDs.map((soupID, index) => (
          <Col xs={24} sm={24} md={12} key={index}>
            <Form.Item
              label={`Soup ${index + 1}`} // แก้ไขให้เป็น backticks
              name={["soups", index]}
              rules={[{ required: index < 2, message: "Please select at least 2 soups!" }]}
            >
              <Select
                placeholder="Select a soup"
                options={soups.map((soupOption) => ({
                  value: soupOption.ID,
                  label: soupOption.name,
                }))}
                defaultValue={soupID} // ใช้ soupID ตรง ๆ
              />
            </Form.Item>
          </Col>
        ))}
      </>
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
                      className="input-number-style" // เพิ่มคลาสสำหรับสไตล์ input
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
                    loading={loading}
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
