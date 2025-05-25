import { startTransition, useOptimistic } from "react";
import { Chats } from "@/constants";
import { ChatInterface } from "@/types/chat";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatList from "./ChatList";
import MessageInput from "./MessageInput";
import chatListReducer from "@/reducers/Chat/chatListReducer";
import { ADD_MESSAGE } from "@/constants/Actions/Chat/ChatList";
import { selectSelectedChannelId } from "@/redux/selectors";

const Chat = () => {
  const currSelectedChannel = useSelector(selectSelectedChannelId);
  const [messages, setMessages] = useState<ChatInterface[]>([]);
  const [optimisticMessages, setOptimisticMessages] = useOptimistic(
    messages,
    chatListReducer
  );
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
      authorId: 1,
      content: message,
      createdAt: Date.now(),
      readBy: [],
      type: "text" as const,
    };
    startTransition(() => {
      setOptimisticMessages({ type: ADD_MESSAGE, payload: newMessage });
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  return (
    <div className="bg-zinc-700 h-full flex flex-col relative">
      <ChatList messages={optimisticMessages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
