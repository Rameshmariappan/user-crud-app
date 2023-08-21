import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const UserNotFound = ({
  icon,
  primary,
  secondary,
  from,
}: {
  icon: React.ReactNode;
  primary: string;
  secondary?: string;
  from: string;
}) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "70vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <Box>{icon}</Box>
      <Box sx={{ fontSize: "26px", fontWeight: 500 }}>{primary}</Box>
      {secondary && (
        <Box sx={{ fontSize: "20px", fontWeight: 500 }}>{secondary}</Box>
      )}
      {from === "pagenotfound" && (
        <Button
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
        >
          Go home!
        </Button>
      )}
    </Box>
  );
};

export default UserNotFound;
