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
import { useEffect, useState } from "react";
import {
  GetSoups,
  GetPackages,
  CreateBooking,
  CreateBookingSoup,
  GetTables,
} from "../../../services/https";
import { BookingInterface } from "../../../interfaces/Booking";
import { SoupInterface } from "../../../interfaces/Soup";
import { PackageInterface } from "../../../interfaces/Package";
import { TableInterface } from "../../../interfaces/Table";
import { BookingSoupInterface } from "../../../interfaces/BookingSoup";
import { useNavigate, useLocation } from "react-router-dom";
import "./booking.css";

function CreateBookingTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  const queryParams = new URLSearchParams(location.search);
  const tableId = queryParams.get("tableId") || "";
  const tableName = queryParams.get("tableName") || "Unknown Table";

  const [soups, setSoups] = useState<SoupInterface[]>([]);
  const [packages, setPackages] = useState<PackageInterface[]>([]);
  const [tables, setTables] = useState<TableInterface[]>([]);
  const [loadingSoups, setLoadingSoups] = useState<boolean>(false);
  const [loadingPackages, setLoadingPackages] = useState<boolean>(false);
  const [loadingTables, setLoadingTables] = useState<boolean>(false);

  const [accountid, setAccountID] = useState<any>(localStorage.getItem("id"));

  useEffect(() => {
    if (!tableId) {
      message.error("Table ID is missing. Please try again.");
      navigate("/booking");
      return;
    }

    const fetchData = async () => {
      setLoadingSoups(true);
      setLoadingPackages(true);
      setLoadingTables(true);
      try {
        const [soupsRes, packagesRes, tablesRes] = await Promise.all([
          GetSoups(),
          GetPackages(),
          GetTables(),
        ]);

        if (soupsRes.status === 200) setSoups(soupsRes.data);
        if (packagesRes.status === 200) setPackages(packagesRes.data);
        if (tablesRes.status === 200) setTables(tablesRes.data);
      } catch (error) {
        message.error("Error fetching data.");
      } finally {
        setLoadingSoups(false);
        setLoadingPackages(false);
        setLoadingTables(false);
      }
    };

    fetchData();
  }, [tableId, navigate]);

  const onFinish = async (values: any) => {
    const selectedSoupIds: number[] = [
      values.soup1,
      values.soup2,
      values.soup3,
      values.soup4,
    ].filter((soup): soup is number => typeof soup === "number");

    const tableIdNumber = Number(tableId);

    if (isNaN(tableIdNumber) || tableIdNumber <= 0) {
      message.error("Invalid table ID.");
      return;
    }

    if (!accountid) {
      message.error("User ID is missing. Please log in.");
      return;
    }

    const bookingPayload: BookingInterface = {
      number_of_customer: values.number_of_customer,
      package_id: values.package_id,
      table_id: tableIdNumber,
      employee_id: Number(accountid),
    };

    try {
      const bookingRes = await CreateBooking(bookingPayload);
      const bookingId = bookingRes.data?.ID; // Ensure `ID` is correctly accessed

      if (!bookingId) {
        message.error(
          "Booking ID is missing from the response. Please contact support."
        );
        return;
      }

      const bookingSoupsPayload: BookingSoupInterface[] = selectedSoupIds.map(
        (soupId) => ({
          booking_id: bookingId,
          soup_id: soupId,
        })
      );

      try {
        await Promise.all(
          bookingSoupsPayload.map((bookingSoup) =>
            CreateBookingSoup(bookingSoup)
          )
        );
        message.success("Booking confirmed!");
        navigate("/booking/table_list");
      } catch (innerError) {
        console.error("Error creating booking soups:", innerError);
        message.error("Failed to create one or more soups.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      message.error("Booking failed! Please try again.");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("Please correct the errors in the form!");
  };

  const handleBackButtonClick = () => {
    navigate("/booking");
  };

  const renderSoupFields = () => {
    const table = tables.find((t) => t.ID === Number(tableId));
    const numberOfSoups = table?.table_capacity_id === 1 ? 2 : 4;

    return Array.from({ length: numberOfSoups }, (_, i) => (
      <Col xs={24} sm={24} md={12} key={`soup${i + 1}`}>
        <Form.Item
          label={`Soup ${i + 1}`}
          name={`soup${i + 1}`}
          rules={[{ required: true, message: "Please select a soup!" }]}
        >
          <Select
            placeholder="Select a soup"
            className="select-style"
            options={soups.map((soup) => ({
              value: soup.ID,
              label: soup.name,
            }))}
            loading={loadingSoups}
          />
        </Form.Item>
      </Col>
    ));
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h1 className="heading-style">Table Booking for {tableName}</h1>
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
              <Row gutter={[16, 16]}>{renderSoupFields()}</Row>
              <Row gutter={[16, 16]}>
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

export default CreateBookingTable;
