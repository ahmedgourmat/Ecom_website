import { useContext } from "react";
import { UserInfo } from "../Context/LoginContext";

export const UserState = () => {
    return useContext(UserInfo);
};