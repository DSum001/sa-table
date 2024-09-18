import {
  Col,
  Row,
  message,
  Card,
  Statistic,
  Button,
  Spin,
  Empty,
  Badge,
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  GetTableStatus,
  GetTables,
  GetTableCapacity,
} from "../../services/https";
import { TableInterface } from "../../interfaces/Table";
import { TableCapacityInterface } from "../../interfaces/TableCapacity";
import { TableStatusInterface } from "../../interfaces/Status";
import "../../App.css";

function Booking() {
  const [tables, setTables] = useState<TableInterface[]>([]);
  const [tableCaps, setTableCaps] = useState<TableCapacityInterface[]>([]);
  const [tableStatus, setTableStatus] = useState<TableStatusInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [tablesRes, statusRes, capsRes] = await Promise.all([
          GetTables(),
          GetTableStatus(),
          GetTableCapacity(),
        ]);

        if (tablesRes.status === 200) {
          setTables(tablesRes.data);
        } else {
          message.error(tablesRes.data.error || "Unable to fetch tables");
        }

        if (statusRes.status === 200) {
          setTableStatus(statusRes.data);
        } else {
          message.error(
            statusRes.data.error || "Unable to fetch table statuses"
          );
        }

        if (capsRes.status === 200) {
          setTableCaps(capsRes.data);
        } else {
          message.error(
            capsRes.data.error || "Unable to fetch table capacities"
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching data from the server");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (table: TableInterface) => {
    if (!table.ID || !table.table_capacity_id) {
      message.warning("Table ID or Table capacity ID is not defined!");
      return;
    }

    const status = tableStatus.find((s) => s.ID === table.table_status_id)
      ?.status;

    if (status === "Occupied") {
      message.warning("This table is not available for booking!");
      return;
    }
    if (status === "Cleaning") {
      message.warning("This table is not already for booking!");
      return;
    }


    if (table.table_name) {
      const params = new URLSearchParams({
        tableId: table.ID.toString(),
        tableName: table.table_name,
        tableCapacityId: table.table_capacity_id.toString(),
      }).toString();

      window.location.href = `/booking/create?${params}`;
    } else {
      message.warning("This table does not have a defined type!");
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Available":
        return "#8BC34A"; 
      case "Occupied":
        return "#FFB74D"; 
      case "Cleaning":
        return "#64B5F6"; 
      default:
        return "#B0BEC5";
    }
  };

  const formatCapacity = (min?: number, max?: number) => {
    return min !== undefined && max !== undefined ? `${min} - ${max}` : "N/A";
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <h1 className="heading">Table Selection</h1>
        <Divider/>
      </Col>
      <Col xs={24}>
        <Card className="card">
          {loading ? (
            <Spin tip="Loading..." className="spinContainer" />
          ) : tables.length === 0 ? (
            <Empty description="No tables available" className="emptyState" />
          ) : (
            <Row gutter={[16, 16]} justify="center" align="middle">
              {tables.map((table) => {
                const tableCapacity = tableCaps.find(
                  (cap) => cap.ID === table.table_capacity_id
                );
                const status = tableStatus.find(
                  (status) => status.ID === table.table_status_id
                );

                return (
                  <Col key={table.ID} xs={24} sm={12} md={8} lg={6}>
                    <Button
                      type="default"
                      className="tableButton"
                      onClick={() => handleButtonClick(table)}
                      disabled={
                        !table.table_name ||
                        status?.status === "Not Available" ||
                        status?.status === "Reserved"
                      }
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textAlign: "left",
                      }}
                    >
                      <Statistic className="statistic-container"
                        title={`Table : ${table.table_name || "Unknown"}`}
                        value={formatCapacity(
                          tableCapacity?.min,
                          tableCapacity?.max
                        )}
                        valueStyle={{ color: "#FF7F50" }}
                        prefix={<UserOutlined className="icon" />}
                      />
                      <Badge
                        count={status?.status ?? "Unknown"}
                        style={{
                          backgroundColor: getStatusColor(
                            status?.status ?? "Unknown"
                          ),
                          color: "#fff",
                        }}
                      />
                    </Button>
                  </Col>
                );
              })}
            </Row>
          )}
        </Card>
      </Col>
    </Row>
  );
}

export default Booking;