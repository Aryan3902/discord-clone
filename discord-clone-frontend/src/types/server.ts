import { ChannelDetails } from "./channel";

interface ServerDetails {
  id: number;
  name: string;
  icon: string;
  mentions: number;
  unread: boolean;
  channels: ChannelDetails[];
}

export type { ServerDetails };
