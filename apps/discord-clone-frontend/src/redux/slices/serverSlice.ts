import { getServers } from "@/api/getServers";
import { ServerDetails } from "@/types/server";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ServerState {
  servers: ServerDetails[];
  loading: boolean;
  error: string | null;
}

const initialState: ServerState = {
  servers: [], // Array of all servers the user has joined
  error: null,
  loading: true,
};

const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServersAsync.fulfilled, (state, action) => {
        state.servers = action.payload;
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
        `Failed to sign up. Please try again. Error: ${error}`,
      );
    }
  },
);

export default serverSlice.reducer;
