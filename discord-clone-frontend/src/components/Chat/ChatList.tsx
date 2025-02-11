import { ChatInterface } from "@/types/chat";

const ChatList = ({ messages }: { messages: ChatInterface[] }) => {
  return (
    <div>
      {messages.map((message) => (
        <div key={message.createdAt}>{message.content}</div>
      ))}
    </div>
  );
};

export default ChatList;
