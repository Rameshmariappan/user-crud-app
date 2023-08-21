import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { userDataType } from "../../@types/userTypes";
import { Box, IconButton } from "@mui/material";
import { useDeleteUserMutation } from "../../api/UserPageApiSlice";
import UserPopup from "./UserPopup";
import toast from "react-hot-toast";
import { useState } from "react";
export default function UserTable({ data }: { data: userDataType[] }) {
  const [deleteUser] = useDeleteUserMutation();
  const [openUserPopup, setUserPopup] = useState(false);
  const [userId, setUserId] = useState<number>(0);

  const closePopup = () => {
    setUserPopup(false);
  };
  const handleDeleteUser = (id: number) => {
    deleteUser(id)
      .unwrap()
      .then(() => {
        toast.success("User deleted successfully!");
      })
      .catch(() => {
        toast.error("Not able to delete the user!");
      });
  };

  const handleGetUser = (id: number) => {
    setUserId(id);
    setUserPopup(true);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First name</TableCell>
              <TableCell align="right">Last name</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Salary</TableCell>
              <TableCell align="right">Experience</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.firstname}
                </TableCell>
                <TableCell align="right">{row.lastname}</TableCell>
                <TableCell align="right">{row.position}</TableCell>
                <TableCell align="right">{row.salary}</TableCell>
                <TableCell align="right">{row.experience}</TableCell>
                <TableCell align="right">
                  <Box
                    sx={{ display: "flex", gap: "1rem", justifyContent: "end" }}
                  >
                    <IconButton
                      onClick={() => {
                        handleGetUser(row._id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleDeleteUser(row._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openUserPopup && (
        <UserPopup
          open={openUserPopup}
          closePopup={closePopup}
          action={"edit"}
          initialValues={userId}
        />
      )}
    </>
  );
}
