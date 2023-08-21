import { Box } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import UserNotFound from "../Component/User/UserNotFound";
const NotFound = () => {
  return (
    <UserNotFound
      icon={<SentimentVeryDissatisfiedIcon fontSize="large" />}
      primary="Page not found!"
      from="pagenotfound"
    />
  );
};

export default NotFound;
