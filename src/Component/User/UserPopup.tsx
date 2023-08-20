import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { popupType } from "../../@types/userTypes";
import {
  useAddNewUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../api/UserPageApiSlice";
import toast from "react-hot-toast";
const useStyles = makeStyles({
  dialoguBox: {
    backgroundColor: "#FFFFFF",
    boxShadow: " 0px 0px 10px 5px rgba(0, 0, 0, 0.08)",
    borderRadius: "5px",
    padding: "10px",
  },
  dialoguBox1: {
    height: "100% !important",
  },
  dialogueText: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#404041",
    textAlign: "center",
  },
  dialogueCancel: {
    width: "24px",
    height: "24px",
    color: "#404041",
  },
  menuitemprimary: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#404041",
  },
  menuitemprimarydisable: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#a2a2a4",
  },
  menuitemsecondary: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#878787",
  },
  menuitemsecondarydisable: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#a2a2a4",
  },
  listitemstyle: {
    padding: "8px 0px",
    cursor: "pointer",
  },
  dialogueIconStyle: {
    position: "absolute",
    top: "16px",
    right: "16px",
  },
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const UserPopup = ({ open, action, closePopup, initialValues }: popupType) => {
  const classes = useStyles();
  const [addUser] = useAddNewUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { data: post } = initialValues
    ? useGetSingleUserQuery(initialValues)
    : {};
  const [particularUserData, setParticularUserData] = useState<{
    _id: number;
    firstname: string;
    lastname: string;
    salary: number;
    position: string;
    experience: number;
  }>({
    _id: 0,
    firstname: "",
    lastname: "",
    salary: 0,
    position: "",
    experience: 0,
  });
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParticularUserData({
      ...particularUserData,
      [event.currentTarget.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (post) {
      setParticularUserData({
        _id: post._id,
        firstname: post.firstname,
        lastname: post.lastname,
        salary: post.salary,
        position: post.position,
        experience: post.experience,
      });
    }
  }, [post]);

  const handleOnSubmitUser = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (particularUserData.salary > 0 && particularUserData.experience > 0) {
      if (action === "create") {
        addUser({
          firstname: particularUserData.firstname,
          lastname: particularUserData?.lastname,
          salary: particularUserData?.salary,
          position: particularUserData?.position,
          experience: particularUserData?.experience,
        })
          .unwrap()
          .then(() => {
            toast.success("User created successfully!");
            setIsLoading(false);
            closePopup();
          })
          .catch(() => {
            toast.error(" Oops not able to create the user!");
            setIsLoading(false);
          });
      } else {
        updateUser(particularUserData)
          .unwrap()
          .then(() => {
            toast.success("User updated successfully!");
            setIsLoading(false);
            closePopup();
          })
          .catch(() => {
            setIsLoading(false);
            toast.error(" Oops not able to update the user!");
          });
      }
    }
  };

  return (
    <>
      <BootstrapDialog
        onClose={closePopup}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{ paper: classes.dialoguBox, container: classes.dialoguBox1 }}
        scroll={"paper"}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          classes={{ root: classes.dialogueText }}
        >
          {action} User
          <IconButton
            aria-label="close"
            onClick={closePopup}
            classes={{ root: classes.dialogueIconStyle }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ overflowX: "hidden" }}>
          <Box
            sx={{
              width: { sm: "250px", md: "400px" },
              height: "100%",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "2rem",
            }}
            component={"form"}
            onSubmit={handleOnSubmitUser}
          >
            <TextField
              id="outlined-basic"
              label="First name"
              variant="outlined"
              name={"firstname"}
              value={particularUserData.firstname}
              required
              type="text"
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-basic"
              label="Last name"
              variant="outlined"
              name="lastname"
              required
              value={particularUserData.lastname}
              type="text"
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-basic"
              label="Salary"
              variant="outlined"
              name="salary"
              required
              value={particularUserData.salary}
              type="number"
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-basic"
              label="Position"
              variant="outlined"
              name="position"
              required
              type="text"
              onChange={handleFormChange}
              value={particularUserData.position}
            />
            <TextField
              id="outlined-basic"
              label="Experience"
              variant="outlined"
              name="experience"
              required
              value={particularUserData.experience}
              onChange={handleFormChange}
              type="number"
            />
            <Button variant="contained" type="submit" disabled={isLoading}>
              {action} user
            </Button>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default UserPopup;
