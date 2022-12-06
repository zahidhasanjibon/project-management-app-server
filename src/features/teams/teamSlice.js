import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   allTeamsList:[]
};

const teamSlice = createSlice({
    name: "allteams",
    initialState,
    reducers: {
        addAllTeams: (state, action) => {
            state.allTeamsList = action.payload

        },
       
    },
});

export const { addAllTeams } = teamSlice.actions;
export default teamSlice.reducer;
