
import { Chats } from "@/constants";
import { ChatInterface } from "@/types/chat";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatList from "./ChatList";
import MessageInput from "./MessageInputBar/MessageInput";
import { selectSelectedChannelId } from "@/redux/selectors";

const Chat = () => {
  const currSelectedChannel = useSelector(selectSelectedChannelId);
  const [messages, setMessages] = useState<ChatInterface[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const fetchedMessages = Chats.filter(
        (message) => message.channelId === currSelectedChannel
      );
      setMessages(fetchedMessages);
    }

    if (currSelectedChannel) {
      fetchMessages();
    }
  }, [currSelectedChannel]);

  async function sendMessage(message: string) {
    const newMessage = {
      channelId: currSelectedChannel!,
      author: {
        id: 1,
        username: "John Doe",
        avatar: "https://github.com/shadcn.png",
        roles: [],
      },
      content: message,
      createdAt: Date.now(),
      readBy: [],
      type: "text" as const,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  return (
    <div className="bg-zinc-700 h-full flex flex-col relative">
      <ChatList messages={messages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
