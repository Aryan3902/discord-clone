import { lazy, Suspense, useState } from "react";
import { Theme } from "emoji-picker-react";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Emojis = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "😍",
  "😘",
  "🥰",
];

const EmojiPickerSkeleton = () => (
  <div className="w-[350px] h-[400px] bg-zinc-700 rounded-lg p-4 animate-pulse">
    <div className="flex gap-2 mb-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-8 flex-1 bg-zinc-600 rounded-md" />
      ))}
    </div>
    <div className="grid grid-cols-8 gap-2">
      {[...Array(56)].map((_, i) => (
        <div key={i} className="w-8 h-8 bg-zinc-600 rounded-full" />
      ))}
    </div>
  </div>
);

const LazyEmojiPicker = lazy(() => import("emoji-picker-react"));

const EmojiPickerComponent = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [currentEmoji, setCurrentEmoji] = useState(
    Math.floor(Math.random() * Emojis.length)
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="hover:scale-125 hover:saturate-100 saturate-0 transition-transform text-xl"
          onMouseEnter={() =>
            setCurrentEmoji(Math.floor(Math.random() * Emojis.length))
          }
        >
          {Emojis[currentEmoji]}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 border-none bg-transparent">
        <Suspense fallback={<EmojiPickerSkeleton />}>
          <LazyEmojiPicker
            width={350}
            height={400}
            theme={"dark" as Theme}
            onEmojiClick={(emoji) => setMessage((prev) => prev + emoji.emoji)}
            lazyLoadEmojis={true}
            previewConfig={{ showPreview: false }}
            skinTonesDisabled
            searchDisabled
          />
        </Suspense>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
