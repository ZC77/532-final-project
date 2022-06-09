import { createContext } from "react";
import UserStore from "./UserStore";

const userStore = new UserStore();
export const userStoreContext = createContext<UserStore>(userStore);
