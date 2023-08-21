import { useState } from "react";
import UserTable from "../../Component/User/UserTable";
import { Box, Button } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import UserPopup from "../../Component/User/UserPopup";
import { useGetUsersQuery } from "../../api/UserPageApiSlice";
import UserNotFound from "../../Component/User/UserNotFound";
const UserPage = () => {
  const [openUserPopup, setUserPopup] = useState(false);
  const { data: post } = useGetUsersQuery();
  const addNewUser = () => {
    setUserPopup(!openUserPopup);
  };
  const closePopup = () => {
    setUserPopup(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ fontWeight: 700 }}>Users data</Box>
        <Button
          variant="contained"
          endIcon={<PersonAddAltIcon />}
          onClick={addNewUser}
        >
          Add User
        </Button>
      </Box>
      {post && post.length > 0 ? (
        <UserTable data={post} />
      ) : (
        <UserNotFound />
      )}
      {openUserPopup && (
        <UserPopup
          open={openUserPopup}
          closePopup={closePopup}
          action={"create"}
        />
      )}
    </Box>
  );
};

export default UserPage;
