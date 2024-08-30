import { useContext } from "react";
import { UserInfo } from "../context/AdminContext";

export const UserState = () => {
    return useContext(UserInfo);
};