import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { emailRegExp } from "../../@method/regularExpression";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { setLoggedin } from "../../store/uiSlices";
const defaultTheme = createTheme();

export default function SignIn() {
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state: any) => state.ui?.userLoginData);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [userData, setUserData] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [userError, setUserError] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validated = checkValuesNotEmpty();
    if (!validated) {
      if (
        loginData.useremail === userData.email &&
        loginData.password === userData.password
      ) {
        setErrorMessage("");
        dispatch(setLoggedin(true));
      } else {
        setErrorMessage("Invalid email or password");
      }
    }
  };

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    errorCheck(event.currentTarget.name, event.target.value);
    setUserData({
      ...userData,
      [event?.currentTarget.name]: event.target.value,
    });
  };

  const errorCheck = (name: string, value: string) => {
    if (value.trim() === "") {
      setUserError({ ...userError, [name]: "Required field" });
    } else if (name === "email") {
      if (!emailRegExp.test(value)) {
        console.log("nooo", emailRegExp.test(value));
        setUserError({ ...userError, [name]: "Please enter a valid email" });
      } else {
        setUserError({ ...userError, [name]: "" });
      }
    } else {
      setUserError({
        ...userError,
        [name]: "",
      });
    }
  };

  function checkValuesNotEmpty() {
    return Object.values(userError).some((value) => value.trim() !== "");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "1005",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChangeForm}
              value={userData.email}
              error={userError.email ? true : false}
              helperText={userError.email ? userError.email : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChangeForm}
              value={userData.password}
              error={userError.password ? true : false}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            {errorMessage !== "" && (
              <Box
                sx={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  color: "red",
                }}
              >
                {errorMessage}
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box>Try this credentials!</Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box>Email:{loginData.useremail}</Box>
                <Box>Password:{loginData.password}</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
