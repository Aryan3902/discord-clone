import { Plus } from "lucide-react";
import { useState } from "react";
import EmojiPickerComponent from "./EmojiPickerComponent";

const MessageInput = ({
  sendMessage,
}: {
  sendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");

  return (
    <div className="p-4">
      <div className="p-4 w-full bg-zinc-600 flex rounded-xl gap-4 items-center">
        <Plus className="text-zinc-800 bg-zinc-400 rounded-full p-1" />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 text-white bg-transparent outline-none"
          placeholder="Message"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(message);
              setMessage("");
            }
          }}
        />
        <EmojiPickerComponent setMessage={setMessage} />
      </div>
    </div>
  );
};

export default MessageInput;
