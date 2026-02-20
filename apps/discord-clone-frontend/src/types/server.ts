import { ChannelDetails } from "./channel";
import { UserInterface } from "./user";

interface ServerDetails {
  id: number;
  name: string;
  icon: string;
  mentions: number;
  unread: boolean;
  channels: ChannelDetails[];
  users: UserInterface[];
}

export type { ServerDetails };
