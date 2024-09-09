import { Col, Row, message, Card, Statistic, Button, Spin, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { GetTableStatus, GetTables } from "../../services/https";
import { TableInterface } from "../../interfaces/Table";
import { TableStatusInterface } from "../../interfaces/Status";
import '../../App.css'; // Adjust the path accordingly

function Table() {
  const [tables, setTables] = useState<TableInterface[]>([]);
  const [tableStatus, setTableStatus] = useState<TableStatusInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const hardcodedValues = ["1-4", "1-4", "1-4", "1-4", "1-4", "1-4", "5-6", "5-6", "5-6", "5-6", "7-8", "7-8"];

  const getTables = async () => {
    setLoading(true);
    try {
      const res = await GetTables();
      if (res.status === 200) {
        setTables(res.data);
      } else {
        setTables([]);
        message.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      setTables([]);
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
    setLoading(false);
  };

  const getTableStatus = async () => {
    setLoading(true);
    try {
      const res = await GetTableStatus();
      if (res.status === 200) {
        setTableStatus(res.data);
      } else {
        setTableStatus([]);
        message.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      setTableStatus([]);
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
    setLoading(false);
  };

  useEffect(() => {
    getTables();
    getTableStatus();
  }, []);

  const handleButtonClick = (table: TableInterface) => {
    const tableType = table.table_type ?? "Unknown Type"; // Fetch the correct table type
    window.location.href = `/table/booking?tableType=${encodeURIComponent(tableType)}&tableName=${encodeURIComponent(tableType)}`;
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h1 className="heading">Table Selection</h1>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card className="card">
            {loading ? (
              <Spin
                tip="Loading..."
                className="spinContainer"
              />
            ) : tables.length === 0 ? (
              <Empty description="No tables available" className="emptyState" />
            ) : (
              <Row gutter={[16, 16]} justify="center" align="middle">
                {tables.map((table, index) => (
                  <Col key={table.ID} xs={24} sm={24} md={12} lg={12} xl={6}>
                    <Button
                      type="default"
                      className="tableButton"
                      onClick={() => handleButtonClick(table)}
                    >
                      <Statistic
                        title={`Table Type ${table.table_type}`}
                        value={hardcodedValues[index % hardcodedValues.length]}
                        valueStyle={{ color: "#FF7F50" }} // Coral color for text
                        prefix={<UserOutlined className="icon" />} // Icon color matching text
                      />
                    </Button>
                  </Col>
                ))}
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Table;
