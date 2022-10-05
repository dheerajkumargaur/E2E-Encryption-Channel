import React from "react";
import SocketContext from "./Context/SocketContext";

export const Sidebar = ({ userList, setSelectedUser, setReciever }) => {
  return (
    <div
      style={{
        width: "300px",
        height: "20vh",
        overflowY: "scroll",
      }}
    >
      {userList?.map((item) => (
        <div
          style={{
            width: "100%",
            height: "70px",
          }}
          onClick={() => {
            setReciever(item);
            setSelectedUser(item.username);
          }}
        >
          Active User :- {item.username}
        </div>
      ))}
    </div>
  );
};
