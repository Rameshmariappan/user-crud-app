import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { setSideBarState } from "../store/uiSlices";
import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
const AuthenticationLayout = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state: any) => state.ui?.isUserLogin);
  const sideBarOpen = useAppSelector((state: any) => state.ui?.isSideBarOpen);

  useEffect(() => {
    console.log(sideBarOpen, "sideBarOpen");
  }, [sideBarOpen]);
  return (
    <div>
      {isAuth ? (
        <Navigate to={"/user/listing"} />
      ) : (
        <Box sx={{height:"100vh"}}>
          <Outlet />
        </Box>
      )}
    </div>
  );
};

export default AuthenticationLayout;
