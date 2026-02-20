import reactIcon from "@/assets/react.svg";
import viteIcon from "@/assets/vite.svg";
import { ChatInterface } from "@/types/chat";
import { RoleInterface } from "@/types/roles";
import { ServerDetails } from "@/types/server";
import { UserInterface } from "@/types/user";

export const roles: RoleInterface[] = [
  {
    id: 1,
    name: "Admin",
    color: "red",
    serverId: 1,
  },
  {
    id: 2,
    name: "Moderator",
    color: "blue",
    serverId: 1,
  },
  {
    id: 3,
    name: "Member",
    color: "green",
    serverId: 1,
  },
]


export const users: UserInterface[] = [
  {
    id: 1,
    username: "React",
    avatar: "null",
    roles: [roles[0]],
  },
  {
    id: 2,
    username: "Vite",
    avatar: "null",
    roles: [roles[1]],
  },
  {
    id: 3,
    username: "Member",
    avatar: "null",
    roles: [roles[2]],
  }
];

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
    users: [users[0], users[1], users[2]],
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
    users: [users[0], users[1], users[2]],
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