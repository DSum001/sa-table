import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../../App.css"; // Import the CSS file here

import {
  UserOutlined,
  LogoutOutlined,
  SolutionOutlined,
  AppstoreOutlined,
  TeamOutlined,
  TruckOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";

import { Layout, Menu, theme, Button, message } from "antd";
import logo from "../../assets/logo.png";
import Dashboard from "../../pages/dashboard";
import Customer from "../../pages/customer";
import CustomerCreate from "../../pages/customer/create";
import CustomerEdit from "../../pages/customer/edit";
import Table from "../../pages/booking";
import TableBooking from "../../pages/booking/create";
import TableList from "../../pages/booking/table_list";

const { Content, Footer, Sider } = Layout;

const FullLayout: React.FC = () => {
  const page = localStorage.getItem("page");

  const [messageApi, contextHolder] = message.useMessage();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };

  const Logout = () => {
    localStorage.clear();
    messageApi.success("Logout successful");
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        className="sider"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <div className="siderLogo">
              <img src={logo} alt="Logo" />
            </div>

            <Menu
              theme="dark"
              defaultSelectedKeys={[page ? page : "dashboard"]}
              mode="inline"
              className="menu"
            >
              <Menu.Item
                key="dashboard"
                className="menuItem"
                onClick={() => setCurrentPage("dashboard")}
              >
                <Link to="/">
                  <UserOutlined />
                  <span>Dashboard</span>
                </Link>
              </Menu.Item>

              <Menu.Item
                key="booking"
                className="menuItem"
                onClick={() => setCurrentPage("booking")}
              >
                <Link to="/booking">
                  <AppstoreOutlined />
                  <span>Table</span>
                </Link>
              </Menu.Item>

              <Menu.Item
                key="orders"
                className="menuItem"
                onClick={() => setCurrentPage("orders")}
              >
                <Link to="/orders">
                  <SolutionOutlined />
                  <span>Orders</span>
                </Link>
              </Menu.Item>

              <Menu.Item
                key="receipt"
                className="menuItem"
                onClick={() => setCurrentPage("receipt")}
              >
                <Link to="/receipt">
                  <QrcodeOutlined />
                  <span>Receipt</span>
                </Link>
              </Menu.Item>

              <Menu.Item
                key="product"
                className="menuItem"
                onClick={() => setCurrentPage("product")}
              >
                <Link to="/product">
                  <TruckOutlined />
                  <span>Products</span>
                </Link>
              </Menu.Item>

              <Menu.Item
                key="employee"
                className="menuItem"
                onClick={() => setCurrentPage("employee")}
              >
                <Link to="/employee">
                  <TeamOutlined />
                  <span>Employee</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>

          <Button
            onClick={Logout}
            className="logoutButton"
            icon={<LogoutOutlined />}
            type="primary"
            danger
          >
            <span>Logout</span>
          </Button>
        </div>
      </Sider>

      <Layout>
        <Content className="content">
          <div
            className="contentInner"
            style={{ background: colorBgContainer }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/customer/create" element={<CustomerCreate />} />
              <Route path="/customer/edit/:id" element={<CustomerEdit />} />
              <Route path="/booking" element={<Table />} />
              <Route path="/booking/create" element={<TableBooking />} />
              <Route path="/booking/table_list" element={<TableList />} />
            </Routes>
          </div>
        </Content>

        <Footer className="footer">Shabu Shop 2099</Footer>
      </Layout>
    </Layout>
  );
};

export default FullLayout;
