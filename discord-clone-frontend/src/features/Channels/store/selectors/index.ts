import { groupIntoCategories } from "@/lib/utils";
import { selectCurrentServer } from "@/redux/selectors";
import { createSelector } from "@reduxjs/toolkit";

export const selectGroupedChannels = createSelector(
  [selectCurrentServer],
  (currServer) => {
    return groupIntoCategories(currServer?.channels || []);
  }
);
