import { useAppSelector } from "../app/hook";
import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
const AuthenticationLayout = () => {
  const isAuth = useAppSelector((state: any) => state.ui?.isUserLogin);
  return (
    <div>
      {isAuth ? (
        <Navigate to={"/user/listing"} />
      ) : (
        <Box sx={{ height: "100vh" }}>
          <Outlet />
        </Box>
      )}
    </div>
  );
};

export default AuthenticationLayout;
