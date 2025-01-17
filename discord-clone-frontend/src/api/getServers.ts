import { servers } from "@/constants";

export const getServers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return servers;
};
