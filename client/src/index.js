import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EquipmentList from "./Pages/EquipmentList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import EquipmentUpdater from "./Pages/EquipmentUpdater";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EmployeeSearch from "./Pages/EmployeeSearch";
import MissingList from "./Pages/MissingList";
import EmployeeYearsOfExperience from "./Pages/EmployeeYearsOfExperience";
import PositionList from "./Pages/PositionList";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/equipments",
        element: <EquipmentList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/equipments/update/:id",
        element: <EquipmentUpdater />,
      },
      {
        path: "/create/equipment",
        element: <EquipmentCreator />,
      },
      {
        path: "/employees/:search",
        element: <EmployeeSearch />,
      },
      {
        path: "/missing",
        element: <MissingList />,
      }
      ,
      {
        path: "/:column/:sortOrder",
        element: <EmployeeList />,
      },
      {
        path: "/employees/years-of/experience/:years",
        element: <EmployeeYearsOfExperience />,
      },
      {
        path: "/employees/positions",
        element: <PositionList />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
