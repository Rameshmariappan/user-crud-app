import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";
import AuthenticationLayout from "./Layouts/AuthenticationLayout";
import Login from "./Pages/Auth/Login";
import UserLayout from "./Layouts/UserLayout";
import UserPage from "./Pages/User/UserPage";
import NotFound from "./Pages/NotFound";

const Loading = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "grid",
        placeContent: "center",
      }}
    >
      <CircularProgress size={"5rem"} sx={{ color: "#6e8b3d" }} />
    </Box>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<AuthenticationLayout />}>
          <Route path="" element={<Login />} />
        </Route>
        <Route path="user" element={<UserLayout />}>
          <Route path="listing" element={<UserPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
