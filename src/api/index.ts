import { UserPageApi } from "./UserPageApiSlice";

export const combinedAPIReducer = {
  [UserPageApi.reducerPath]: UserPageApi.reducer,
};

export const apiMiddlewares = [UserPageApi.middleware];

const allAPIs = [UserPageApi];

export default allAPIs;
