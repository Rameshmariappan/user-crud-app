import { Box } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
const UserNotFound = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "70vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap:"1rem"
      }}
    >
      <Box>
        <GroupIcon fontSize="large" />
      </Box>
      <Box sx={{ fontSize: "26px",fontWeight:500 }}>No users found!</Box>
      <Box sx={{ fontSize: "20px",fontWeight:500 }}>If u want to create a new user click add user button!</Box>
    </Box>
  );
};

export default UserNotFound;
