import { Col, Row, message, Card, Statistic, Button, Spin, Empty, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { GetTableStatus, GetTables, GetTableCapacity } from '../../services/https';
import { TableInterface } from '../../interfaces/Table';
import { TableCapacityInterface } from '../../interfaces/TableCapacity';
import { TableStatusInterface } from '../../interfaces/Status';
import '../../App.css';

function Table() {
  const [tables, setTables] = useState<TableInterface[]>([]);
  const [tableCaps, setTableCaps] = useState<TableCapacityInterface[]>([]);
  const [tableStatus, setTableStatus] = useState<TableStatusInterface[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [tablesRes, statusRes, capsRes] = await Promise.all([
          GetTables(),
          GetTableStatus(),
          GetTableCapacity()
        ]);

        if (tablesRes.status === 200) setTables(tablesRes.data);
        else message.error(tablesRes.data.error || 'Unable to fetch tables');

        if (statusRes.status === 200) setTableStatus(statusRes.data);
        else message.error(statusRes.data.error || 'Unable to fetch table statuses');

        if (capsRes.status === 200) setTableCaps(capsRes.data);
        else message.error(capsRes.data.error || 'Unable to fetch table capacities');
      } catch (error) {
        message.error('Error fetching data from the server');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (table: TableInterface) => {
    const status = tableStatus.find((s) => s.ID === table.table_status_id)?.status;
  
    if (status === 'Not Available' || status === 'Reserved') {
      message.warning('This table is not available for booking!');
      return;
    }
  
    if (table.table_name) {
      window.location.href = `/table/booking?tableName=${encodeURIComponent(table.table_name)}&tableCapacityId=${table.table_capacity_id}`;
    } else {
      message.warning('This table does not have a defined type!');
    }
  }; 

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'green';
      case 'Reserved': return 'orange';
      case 'Occupied': return 'red';
      case 'Not Available': return 'gray';
      default: return 'default';
    }
  };

  const formatCapacity = (min?: number, max?: number) => min !== undefined && max !== undefined ? `${min} - ${max}` : 'N/A';

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <h1 className="heading">Table Selection</h1>
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
                const tableCapacity = tableCaps.find((cap) => cap.ID === table.table_capacity_id);
                const status = tableStatus.find((status) => status.ID === table.table_status_id);

                return (
                  <Col key={table.ID} xs={24} sm={12} md={8} lg={6}>
                    <Button
                      type="default"
                      className="tableButton"
                      onClick={() => handleButtonClick(table)}
                      disabled={!table.table_name || status?.status === 'Not Available' || status?.status === 'Reserved'}
                      style={{ width: '100%', textAlign: 'left' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Statistic
                          title={`Table Type ${table.table_name || 'Unknown'}`}
                          value={formatCapacity(tableCapacity?.min, tableCapacity?.max)}
                          valueStyle={{ color: '#FF7F50' }}
                          prefix={<UserOutlined className="icon" />}
                        />
                        <Badge
                          count={status?.status ?? 'Unknown'}
                          style={{ backgroundColor: getStatusColor(status?.status ?? 'Unknown'), color: '#fff' }}
                        />
                      </div>
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

export default Table;