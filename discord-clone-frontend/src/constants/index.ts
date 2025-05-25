import reactIcon from "@/assets/react.svg";
import viteIcon from "@/assets/vite.svg";
import { ChatInterface } from "@/types/chat";
import { ServerDetails } from "@/types/server";
import { UserInterface } from "@/types/user";

export const servers: ServerDetails[] = [
  {
    id: 1,
    name: "React",
    icon: reactIcon,
    mentions: 10,
    unread: true,
    channels: [
      {
        id: 1,
        name: "General",
        isCategory: true,
        category: "General",
        mentions: 0,
        unread: false,
      },

      {
        id: 2,
        name: "Announcements",
        isCategory: false,
        category: "General",
        mentions: 0,
        unread: false,
      },
      {
        id: 3,
        name: "help",
        isCategory: false,
        category: "General",
        mentions: 10,
        unread: true,
      },
      {
        id: 4,
        name: "Development",
        isCategory: true,
        category: "Development",
        mentions: 0,
        unread: false,
      },
      {
        id: 5,
        name: "hooks",
        isCategory: false,
        category: "Development",
        mentions: 0,
        unread: false,
      },
      {
        id: 6,
        name: "components",
        isCategory: false,
        category: "Development",
        mentions: 3,
        unread: false,
      },
      {
        id: 7,
        name: "Community",
        isCategory: true,
        category: "Community",
        mentions: 0,
        unread: false,
      },
      {
        id: 8,
        name: "introductions",
        isCategory: false,
        category: "Community",
        mentions: 0,
        unread: false,
      },
      {
        id: 9,
        name: "showcase",
        isCategory: false,
        category: "Community",
        mentions: 0,
        unread: false,
      },
    ],
  },
  {
    id: 2,
    name: "Vite Server",
    icon: viteIcon,
    mentions: 0,
    unread: false,
    channels: [
      {
        id: 10101,
        name: "General",
        isCategory: false,
        category: null,
        mentions: 0,
        unread: false,
      },
    ],
  },
];

export const Chats: ChatInterface[] = [
  {
    channelId: 1,
    authorId: 1,
    content: "Hello World",
    createdAt: 1669888888,
    readBy: [1, 2, 3],
    type: "text",
  },
  {
    channelId: 1,
    authorId: 2,
    content: "Hello World",
    createdAt: 1669888888,
    readBy: [1, 2, 3],
    type: "text",
  },
  {
    channelId: 1,
    authorId: 3,
    content: "Hello World",
    createdAt: 1669888888,
    readBy: [1, 2, 3],
    type: "text",
  },
  {
    channelId: 1,
    authorId: 4,
    content: "Hello World",
    createdAt: 1669888888,
    readBy: [1, 2, 3],
    type: "text",
  },
  {
    channelId: 1,
    authorId: 5,
    content: "Hello World",
    createdAt: 1669888888,
    readBy: [1, 2, 3],
    type: "text",
  },
  {
    channelId: 1,
    authorId: 6,
    content: "Hello World",
    createdAt: 1669888888,
    readBy: [1, 2, 3],
    type: "text",
  },
];

export const users: UserInterface[] = [
  {
    id: 1,
    username: "React",
    avatar: "null",
  },
  {
    id: 2,
    username: "Vite",
    avatar: "null",
  },
];
