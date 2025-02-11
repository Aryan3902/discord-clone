import React, { useState } from "react";

const MessageInput = ({
  sendMessage,
}: {
  sendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");

  return (
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="text-black"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(message);
          setMessage("");
        }
      }}
    />
  );
};

export default MessageInput;
