import reactIcon from "@/assets/react.svg";
import viteIcon from "@/assets/vite.svg";
import { ServerDetails } from "@/types/server";

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
        isCategory: true,
        category: "General",
        mentions: 0,
        unread: false,
      },
      {
        id: 3,
        name: "help",
        isCategory: false,
        category: "General",
        mentions: 0,
        unread: false,
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
        mentions: 0,
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
        id: 1,
        name: "General",
        isCategory: false,
        category: null,
        mentions: 0,
        unread: false,
      },
    ],
  },
];
