import { CategoryChannelDetails, ChannelDetails } from "@/types/channel";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNameInitials(name: string) {
  return name
    .split(" ", 2)
    .map((word) => word[0])
    .join("");
}

export function groupIntoCategories(channels: ChannelDetails[]) {
  return channels.reduce((acc, channel) => {
    // If Category
    if (channel.isCategory && channel.category) {
      if (!acc.find((x) => x.category === channel.category)) {
        acc.push({
          ...channel,
          channels: [],
        });
      }
    } else {
      // If Channel, but no category
      if (!channel.category) {
        acc.push(channel);
      } else {
        const currentCategory = acc.find(
          (x) => x.category === channel.category
        );
        if (currentCategory) {
          currentCategory.channels = [
            ...(currentCategory.channels || []),
            channel,
          ];
        } else {
          acc.push({
            ...channel,
            channels: [channel],
          });
        }
      }
    }
    return acc;
  }, [] as CategoryChannelDetails[]);
}
