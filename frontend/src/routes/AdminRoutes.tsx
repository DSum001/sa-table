import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/third-patry/Loadable";
import FullLayout from "../layout/FullLayout";

const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));
const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
const Customer = Loadable(lazy(() => import("../pages/customer")));
const CreateCustomer = Loadable(lazy(() => import("../pages/customer/create")));
const EditCustomer = Loadable(lazy(() => import("../pages/customer/edit")));
const Booking = Loadable(lazy(() => import("../pages/booking")));
const CreateBookingTable = Loadable(lazy(() => import("../pages/booking/create")));
const TableList = Loadable(lazy(() => import("../pages/booking/booking_list")));
const EditBookingTable = Loadable(lazy(() => import("../pages/booking/edit")));

const AdminRoutes = (isLoggedIn: boolean): RouteObject => {
  return {
    path: "/",

    element: isLoggedIn ? <FullLayout /> : <MainPages />,

    children: [
      {
        path: "/",

        element: <Dashboard />,
      },

      {
        path: "/customer",

        children: [
          {
            path: "/customer",

            element: <Customer />,
          },

          {
            path: "/customer/create",

            element: <CreateCustomer />,
          },

          {
            path: "/customer/edit/:id",

            element: <EditCustomer />,
          },
        ],
      },

      {
        path: "/booking",

        children: [
          {
            path: "/booking",

            element: <Booking />,
          },

          {
            path: "/booking/create",

            element: <CreateBookingTable />,
          },

          {
            path: "/booking/edit/:id",

            element: <EditBookingTable />,
          },

          {
            path: "/booking/booking_list",

            element: <TableList />,
          },
        ],
      },
    ],
  };
};

export default AdminRoutes;
