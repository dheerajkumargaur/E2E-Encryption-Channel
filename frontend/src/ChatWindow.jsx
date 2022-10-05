import React, { useContext, useEffect, useState } from "react";
import SocketContext from "./Context/SocketContext";
import EncryptRsa from "encrypt-rsa";
import "./App.css";
export const ChatWindow = ({
  username,
  selectedUser,
  messageList,
  reciever,
  myPrivateKey,
}) => {
  const encryptRsa = new EncryptRsa();
  const socket = useContext(SocketContext);
  const [myMessage, setmyMessage] = useState("");
  const [showMsg, setSHowMsg] = useState([]);
  const handleSend = () => {
    const encryptedText = encryptRsa.encryptStringWithRsaPublicKey({
      text: myMessage,
      publicKey: reciever.publicKey,
    });
    socket.emit("send-message", { message: encryptedText, username, reciever });
    setmyMessage("");
  };
  useEffect(() => {
    socket.on("get-message", (message) => {
      const decryptedText = encryptRsa.decryptStringWithRsaPrivateKey({
        text: message.text,
        privateKey: myPrivateKey,
      });
      showMsg.push(decryptedText);
    });
  }, []);

  return (
    <div className="chatDisplay">
      <div className="message">
        {showMsg.map((elem) => {
          return <div className="mapDiv">{elem}</div>;
        })}
      </div>
      <div className="Entermessage">
        <input
          type="text"
          onChange={(e) => setmyMessage(e.target.value)}
          value={myMessage}
          placeholder="Enter Message "
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
