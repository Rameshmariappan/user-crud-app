import { styled } from "@mui/material/styles";
const drawerWidth = 240;
export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  backgroundColor: "white",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("xs")]: {
    marginLeft: `0px`,
    // position: "absolute",
  },
  [theme.breakpoints.up("sm")]: {
    position: "inherit",
    marginLeft: `calc(${theme.spacing(8)} + 1px)`,
    width: `calc(100vw - ${theme.spacing(8)} + 1px)`,
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: `calc(${theme.spacing(8)} + 1px)`,
    width: `calc(100vw - ${theme.spacing(8)} + 1px)`,
  },
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("xs")]: {
      position: "absolute",
      marginLeft: 0,
    },
    [theme.breakpoints.up("md")]: {
      position: "inherit",
      marginLeft: drawerWidth,
      width: `calc(100vw - ${drawerWidth}px)`,
    },
  }),
}));
