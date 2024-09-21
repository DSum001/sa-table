import {
  Card,
  Row,
  Col,
  InputNumber,
  Select,
  Button,
  Form,
  message,
} from "antd";
import { useEffect, useState } from "react";
import {
  GetSoups,
  GetPackages,
  CreateBooking,
  CreateBookingSoup,
  UpdateTableStatus,
  GetTables,
  GetTableCapacity,
} from "../../../services/https";
import { BookingInterface } from "../../../interfaces/Booking";
import { SoupInterface } from "../../../interfaces/Soup";
import { BookingSoupInterface } from "../../../interfaces/BookingSoup";
import { PackageInterface } from "../../../interfaces/Package";
import { TableInterface } from "../../../interfaces/Table";
import { TableCapacityInterface } from "../../../interfaces/TableCapacity";
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
  const [tableCaps, setTableCaps] = useState<TableCapacityInterface[]>([]);
  const [loadingSoups, setLoadingSoups] = useState<boolean>(false);
  const [loadingPackages, setLoadingPackages] = useState<boolean>(false);
  const [loadingTables, setLoadingTables] = useState<boolean>(false);

  const [accountid, setAccountID] = useState<string | null>(
    localStorage.getItem("id")
  );

  const fetchData = async () => {
    try {
      const [soupsRes, packagesRes, tablesRes, capsRes] = await Promise.all([
        GetSoups(),
        GetPackages(),
        GetTables(),
        GetTableCapacity(),
      ]);
      return { soupsRes, packagesRes, tablesRes, capsRes };
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  useEffect(() => {
    if (!tableId) {
      message.error("Table ID is missing. Please try again.");
      navigate("/booking");
      return;
    }

    const loadData = async () => {
      setLoadingSoups(true);
      setLoadingPackages(true);
      setLoadingTables(true);

      try {
        const { soupsRes, packagesRes, tablesRes, capsRes } = await fetchData();

        if (soupsRes.status === 200) setSoups(soupsRes.data);
        if (packagesRes.status === 200) setPackages(packagesRes.data);
        if (tablesRes.status === 200) setTables(tablesRes.data);
        if (capsRes.status === 200) setTableCaps(capsRes.data);
      } catch (error) {
        message.error("Error fetching data. Please try again.");
      } finally {
        setLoadingSoups(false);
        setLoadingPackages(false);
        setLoadingTables(false);
      }
    };

    loadData();
  }, [tableId, navigate]);

  const updateTableStatus = async (tableId: number, statusId: number) => {
    try {
      const response = await UpdateTableStatus(tableId, {
        table_status_id: statusId,
      });
      if (response.status !== 200) {
        throw new Error("Failed to update table status.");
      }
      message.success("Table status updated successfully!");
    } catch (error) {
      message.error("Failed to update table status.");
      console.error("Error updating table status:", error);
    }
  };

  const fetchTableCapacityLimits = () => {
    const table = tables.find((t) => t.ID === Number(tableId));
    if (!table) return { min: 1, max: 10 }; // Default values

    const capacity = tableCaps.find(
      (cap) => cap.ID === table.table_capacity_id
    );
    if (!capacity) return { min: 1, max: 10 }; // Default if not found

    return { min: capacity.min || 1, max: capacity.max || 10 }; // Ensure min/max are defined
  };

  const onFinish = async (values: any) => {
    const tableIdNumber = Number(tableId);

    const { min, max } = fetchTableCapacityLimits();
    if (values.number_of_customer < min || values.number_of_customer > max) {
      message.error(`Number of customers must be between ${min} and ${max}!`);
      return;
    }

    if (!tableId || isNaN(tableIdNumber) || tableIdNumber <= 0) {
      message.error("Invalid or missing table ID.");
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
      const bookingId = bookingRes?.booking_id;

      if (!bookingId)
        throw new Error("Booking ID is missing from the response");

      const selectedSoupIds = [
        values.soup1,
        values.soup2,
        values.soup3,
        values.soup4,
      ].filter((soup): soup is number => typeof soup === "number");

      const bookingSoupsPayload: BookingSoupInterface[] = selectedSoupIds.map(
        (soupId) => ({
          BookingID: bookingId,
          SoupID: soupId,
        })
      );

      await Promise.all(bookingSoupsPayload.map(CreateBookingSoup));

      await updateTableStatus(tableIdNumber, 2);
      message.success("Booking confirmed!");
      navigate("/booking/booking_list");
    } catch (error) {
      message.error("Booking failed! Please try again.");
      console.error("Booking error:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("Please correct the errors in the form.");
    console.error("Form submission error:", errorInfo);
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
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: "0px" }}>
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
                    label="Number of Customers"
                    name="number_of_customer"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the number of customers!",
                      },
                      {
                        type: "number",
                        min: fetchTableCapacityLimits().min || 1, // Add default value
                        max: fetchTableCapacityLimits().max || 10, // Add default value
                        message: `Number of customers must be between ${
                          fetchTableCapacityLimits().min || 1
                        } and ${fetchTableCapacityLimits().max || 10}!`,
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Customers"
                      min={fetchTableCapacityLimits().min || 1} // Ensure valid min
                      max={fetchTableCapacityLimits().max || 10} // Ensure valid max
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
                      loading={loadingPackages}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>{renderSoupFields()}</Row>
              <Row gutter={[16, 16]}></Row>
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