import { Box } from "@mui/material";
import MiniDrawer from "../Component/User/MiniDrawer";
import { Navigate, Outlet } from "react-router-dom";
import { Main } from "../StylesMUI/Main";
import { useAppSelector } from "../app/hook";
const UserLayout = () => {
  const SideBarOpen = useAppSelector((state: any) => state.ui?.isSideBarOpen);
  const IsAuth = useAppSelector((state: any) => state.ui?.isUserLogin);

  return (
    <>
      {IsAuth ? (
        <Box sx={{ width: "100%", height: "100vh" }}>
          <Box id="infiniteScroll" height="100vh" sx={{ overflowX: "hidden" }}>
            <MiniDrawer />
            <Main open={SideBarOpen} sx={{ width: "100%", marginTop: "65px" }}>
              <Box
                sx={{
                  overflowX: "hidden",
                  width: "100%",
                  minHeight: "100vh",
                  padding: "30px",
                }}
              >
                <Outlet />
              </Box>
            </Main>
          </Box>
        </Box>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default UserLayout;
