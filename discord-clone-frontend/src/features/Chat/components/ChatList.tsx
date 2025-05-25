import { ChatInterface } from "@/types/chat";

const ChatMessage = ({ message }: { message: ChatInterface }) => {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl">
      <div className="text-zinc-400 text-sm">{message.createdAt}</div>
      <div className="text-white">{message.content}</div>
    </div>
  );
};

const ChatList = ({ messages }: { messages: ChatInterface[] }) => {
  console.log(messages);
  return (
    <div className="flex flex-1 flex-col justify-end overflow-y-auto">
      {messages.map((message) => (
        <ChatMessage key={message.createdAt} message={message} />
      ))}
    </div>
  );
};

export default ChatList;
