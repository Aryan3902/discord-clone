import React, { useOptimistic } from "react";
import { Chats } from "@/constants";
import { RootState } from "@/redux/store";
import { ChatInterface } from "@/types/chat";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatList from "./ChatList";
import MessageInput from "./MessageInput";
import chatListReducer from "@/reducers/Chat/chatListReducer";
import { ADD_MESSAGE } from "@/constants/Actions/Chat/ChatList";

const Chat = () => {
  const currSelectedChannel = useSelector(
    (state: RootState) =>
      state.server.selectedChannelIds[state.server.selectedServerId ?? 0] ??
      null
  );
  const [messages, setMessages] = useState<ChatInterface[]>([]);
  const [optimisticMessages, setOptimisticMessages] = useOptimistic(
    messages,
    chatListReducer
  );

  useEffect(() => {
    async function fetchMessages() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const messages = Chats.filter(
        (message) => message.channelId === currSelectedChannel
      );
      setMessages(messages);
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
    setOptimisticMessages({ type: ADD_MESSAGE, payload: newMessage });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessages((messages) => [...messages, newMessage]);
  }

  return (
    <div className="bg-zinc-700 h-full flex flex-col">
      <div className="flex-1">
        <ChatList messages={optimisticMessages} />
      </div>
      <div>
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
