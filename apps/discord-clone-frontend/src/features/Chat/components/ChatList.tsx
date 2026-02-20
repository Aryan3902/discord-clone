import { useMemo } from "react";
import { formatDate, getNameInitials } from "@/lib/utils";
import { ChatInterface } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatMessage = ({ message }: { message: ChatInterface }) => {
  const formattedTimestamp = useMemo(() => formatDate(message.createdAt), [message.createdAt]);
  return (
    <div className="flex gap-2">
        <div className="px-2">
          <Avatar className="size-10">
            <AvatarImage src={message.author.avatar} />
            <AvatarFallback>{getNameInitials(message.author.username)}</AvatarFallback>
          </Avatar>
        </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="text-white font-medium">{message.author.username}</div>
          <div className="text-zinc-400 text-xs">{formattedTimestamp}</div>
        </div>
      <div className="text-white pr-2">{message.content}</div>
      </div>
    </div>
  );
};

const ChatList = ({ messages }: { messages: ChatInterface[] }) => {
  return (
    <div className="flex flex-1 flex-col gap-4 justify-end overflow-y-auto">
      {messages.map((message) => (
        <ChatMessage key={message.createdAt} message={message} />
      ))}
    </div>
  );
};

export default ChatList;
