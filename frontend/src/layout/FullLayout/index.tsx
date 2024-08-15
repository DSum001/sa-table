import React, { useState } from "react";

import { Routes, Route, Link } from "react-router-dom";

import "../../App.css";

import { UserOutlined, DashboardOutlined,LogoutOutlined } from "@ant-design/icons";

import { Breadcrumb, Layout, Menu, theme, Button, message } from "antd";

// import logo from "../../assets/logo.png";

import Dashboard from "../../pages/dashboard";

import Customer from "../../pages/customer";

import CustomerCreate from "../../pages/customer/create";

import CustomerEdit from "../../pages/customer/edit";

import Table from "../../pages/table";

import TableBooking from "../../pages/table/booking";


const {Content, Footer, Sider } = Layout;


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

            <div

              style={{

                display: "flex",

                justifyContent: "center",

                marginTop: 20,

                marginBottom: 20,

              }}

            >

              {/* <img

                src={logo}

                alt="Logo"

                style={{ width: "80%" }}

              /> */}

            </div>

            <Menu

              theme="dark"

              defaultSelectedKeys={[page ? page : "dashboard"]}

              mode="inline"

            >

              <Menu.Item

                key="dashboard"

                onClick={() => setCurrentPage("dashboard")}

              >

                <Link to="/">

                  <DashboardOutlined />

                  <span>Table</span>

                </Link>

              </Menu.Item>


              <Menu.Item

                key="customer"

                onClick={() => setCurrentPage("customer")}

              >

                <Link to="/table">

                  <UserOutlined />

                  <span>Table</span>

                </Link>

              </Menu.Item>

            </Menu>

          </div>


          <Button 
            onClick={Logout} 
            style={{ margin: 4 }} 
            icon={<LogoutOutlined />} 
            type="primary" 
            shape="circle"
          />

        </div>

      </Sider>


      <Layout>

        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}

        <Content style={{ margin: "0 16px" }}>

          <Breadcrumb style={{ margin: "16px 0" }} />

          <div

            style={{

              padding: 24,

              borderRadius: "8px",

              minHeight: "100%",

              background: colorBgContainer,

            }}

          >

            <Routes>

              <Route path="/" element={<Dashboard />} />

              <Route path="/customer" element={<Customer />} />

              <Route path="/customer/create" element={<CustomerCreate />} />

              <Route path="/customer/edit/:id" element={<CustomerEdit />} />

              <Route path="/table" element={<Table />} />

              <Route path="/table/booking" element={<TableBooking />} />

            </Routes>

          </div>

        </Content>

        <Footer style={{ textAlign: "center" }}>

          Shabubu 2099
        </Footer>

      </Layout>

    </Layout>

  );

};


export default FullLayout;