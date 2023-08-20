export interface userDetailsType {
  isUserLogin: boolean;
  isSideBarOpen: boolean;
  userLoginData: {
    useremail: string;
    password: string;
  };
}

export interface popupType {
  open: boolean;
  closePopup: () => void;
  action: "create" | "edit";
  initialValues?: number;
}

export interface userDataType {
  firstname: string;
  lastname: string;
  salary: number;
  position: string;
  experience: number;
  _id:number
}
