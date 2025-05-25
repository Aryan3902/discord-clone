import { lazy, Suspense, useState } from "react";
import { Theme } from "emoji-picker-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Emojis } from "../../constants";
import EmojiPickerSkeleton from "./EmojiPickerSkeleton";

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

export default EmojiPickerComponent;
