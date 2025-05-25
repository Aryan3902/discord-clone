import { getServers } from "@/api/getServers";
import { getSelectedChannelId } from "@/lib/utils";
import { ServerDetails } from "@/types/server";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServerState {
  servers: ServerDetails[];
  selectedServerId: number | null;
  selectedChannelIds: SelectedChannelIdsInterface;
  loading: boolean;
  error: string | null;
}

const initialState: ServerState = {
  servers: [], // Array of all servers the user has joined
  selectedServerId: localStorage.getItem("lastSelectedServerId")
    ? Number(localStorage.getItem("lastSelectedServerId"))
    : null, // The server the user has selected
  selectedChannelIds: {}, // Map of channels the user has selected for each server
  error: null,
  loading: true,
};

const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    selectServer: (state, action: PayloadAction<number>) => {
      state.selectedServerId = action.payload;
      localStorage.setItem("lastSelectedServerId", action.payload.toString());
    },
    selectChannel: (
      state,
      action: PayloadAction<{ serverId: number; channelId?: number | null }>
    ) => {
      let selectedChannelId = action.payload.channelId;
      // In case the user is visiting a channel for the first time
      if (!selectedChannelId)
        selectedChannelId = getSelectedChannelId(
          action.payload.serverId,
          state.selectedChannelIds,
          state.servers
        );
      state.selectedChannelIds[action.payload.serverId] = selectedChannelId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServersAsync.fulfilled, (state, action) => {
        state.servers = action.payload;
        state.selectedServerId = action.payload[0].id;
        state.loading = false;
      })
      .addCase(fetchServersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServersAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

const fetchServers = async () => {
  const servers = await getServers();
  return servers;
};

export const fetchServersAsync = createAsyncThunk(
  "server/fetchServers",
  async (_, { rejectWithValue }) => {
    try {
      const x = await fetchServers();
      if (typeof x == "string") {
        throw new Error("Failed");
      }
      return x;
    } catch (error: unknown) {
      return rejectWithValue(
        `Failed to sign up. Please try again. Error: ${error}`
      );
    }
  }
);

export const { selectServer, selectChannel } = serverSlice.actions;
export default serverSlice.reducer;
