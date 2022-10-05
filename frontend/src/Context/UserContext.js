import { createContext, useState } from "react";

export const UserContext = createContext({
  showSectionCreation: "",
  setUserName: () => {},
});

export const useUserContext = () => {
  const [username, setUserName] = useState("");
  return {
    username,
    setUserName,
  };
};
