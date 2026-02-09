import { CategoryChannelDetails, ChannelDetails } from "@/types/channel";
import { RoleInterface } from "@/types/roles";
import { ServerDetails } from "@/types/server";
import { UserInterface } from "@/types/user";
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

export function groupIntoRoles(users: UserInterface[]) {
  return users.reduce((acc, user) => {
    if (!acc.find((x) => x.role.id === user.roles[0].id)) {
      acc.push({
        role: user.roles[0],
        users: [user],
      });
    } else {
      acc.find((x) => x.role.id === user.roles[0].id)?.users.push(user);
    }
    return acc;
  }, [] as {
    role: RoleInterface;
    users: UserInterface[];
  }[]);
}
/**
 * Retrieves the selected channel ID based on the selected server ID, selected channel IDs, and server details.
 * If no server is selected, it returns the ID of the first channel of the first server.
 * If the selected server has no channel selected, it returns the ID of the first non-category channel of the selected server.
 * Otherwise, it returns the ID of the selected channel for the selected server.
 * @param selectedServerId The ID of the selected server.
 * @param selectedChannelIds An object containing selected channel IDs for each server.
 * @param servers An array of server details.
 * @returns The selected channel ID.
 */
export function getSelectedChannelId(
  selectedServerId: number | null,
  selectedChannelIds: Record<number, number | null>,
  servers: ServerDetails[]
) {
  if (!selectedServerId) {
    if (servers.length > 0) return servers[0].channels[0].id;
    return null;
  }
  if (!selectedChannelIds[selectedServerId]) {
    return (
      servers
        .find((server) => server.id === selectedServerId)
        ?.channels.find((channel) => channel.isCategory !== true)?.id ?? null
    );
  }
  return selectedChannelIds[selectedServerId];
}
