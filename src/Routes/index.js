import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { layoutTypes } from "../constants/layout";
import NonAuthLayout from "../Layout/NonAuthLayout";
import VerticalLayout from "../Layout/VerticalLayout/index";
import HorizontalLayout from "../Layout/HorizontalLayout/index";
import { AuthProtected } from "./AuthProtected";
import { authProtectedRoutes, publicRoutes } from "./routes";
import { createSelector } from 'reselect';

const getLayout = (layoutType) => {
  switch (layoutType) {
    case layoutTypes.HORIZONTAL:
      return HorizontalLayout;
    case layoutTypes.VERTICAL:
    default:
      return VerticalLayout;
  }
};

const RouteWrapper = () => {
  const location = useLocation();
  console.log("Current location:", location);

  const routepage = createSelector(
    (state) => state.Layout,
    (layout) => ({
      layoutType: layout.layoutType,
    })
  );

  const { layoutType } = useSelector(routepage);
  const Layout = getLayout(layoutType);

  return (
    <Routes>
      <Route path="" element={<NonAuthLayout/>}>
         {publicRoutes.map((route, idx) => (
          <Route
              key={idx}
              path={route.path}
              element={
                  route.component
              }
            />
          ))}
          {/* <Route path="/login" element={<>testing</>} /> */}
          </Route>

      <Route element={<AuthProtected/>}>
        <Route element={<Layout/>}>
        {authProtectedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={route.component}
          />
        ))}
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/404" replace />} />

    </Routes>
  );
};

const AppRoutes = () => {
  return (
         <RouteWrapper />
  );
};

export default AppRoutes;