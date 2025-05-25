import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectCurrentServer = createSelector(
  [
    (state: RootState) => state.server.servers,
    (state: RootState) => state.server.selectedServerId,
  ],
  (servers, selectedServerId) => servers.find((x) => x.id === selectedServerId)
);

export const selectSelectedChannelId = createSelector(
  [(state: RootState) => state.server.selectedChannelIds, selectCurrentServer],
  (selectedChannelIds, currServer) =>
    currServer ? selectedChannelIds[currServer.id] : null
);
