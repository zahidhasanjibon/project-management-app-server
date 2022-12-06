/* eslint-disable eqeqeq */
import { apiSlice } from "../api/apiSlice";
import { projectsApi } from "../projects/projectsApi";
import { addAllTeams } from "./teamSlice";

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?members_like=${email}`,
    }),

    addTeam: builder.mutation({
      query: (data) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),

      // pesimistically update allteams cache
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const teamData = await queryFulfilled;

          if (teamData?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getTeams",
                teamData.data.ownerEmail,
                (draft) => {
                  draft.push(teamData.data);
                  let allTeams =  JSON.stringify(draft);  
                dispatch(addAllTeams(JSON.parse(allTeams)))
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    updateTeamMember:builder.mutation({
        query: ({ id, data}) => ({
            url: `/teams/${id}`,
            method: "PATCH",
            body: data,
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          const updatedTeamMember = await queryFulfilled;
      
          if (updatedTeamMember?.data?.id) {
              console.log(updatedTeamMember);

              dispatch(
                apiSlice.util.updateQueryData(
                  "getTeams",
                  updatedTeamMember.data.ownerEmail,
                  (draft) => {
                    console.log(JSON.stringify(draft));
                    console.log(arg.id);
                    const singleTeam =  draft.find((t) => t.id == arg.id.toString());
                      singleTeam.members = arg.data.members
                      singleTeam.membersAvatar = arg.data.membersAvatar
                      // singleTeam.members = [...updatedTeamMember.members]
                      // singleTeam.membersAvatar = [...updatedTeamMember.membersAvatar]
                  }
                )
              );


              // a new member added to team now find project under this team has or not 
            dispatch (projectsApi.endpoints.getSingleProject.initiate(updatedTeamMember.data.name))
            .unwrap()
                .then((data) => {
                  // if find project under the team
                  // update project so that when a new member added to a team  the new member can also see the project under his team. 
                   if(data.length > 0){
                    dispatch(projectsApi.endpoints.updateProjectTeamMembers.initiate({
                        id:data[0].id,
                        data:{
                          teamMembers:[...updatedTeamMember.data.members]
                        }
                    }))
                    .unwrap()
                    .then((d) => {
                     
                    })
                    .catch(err => console.log(err))
                   }
                })
                .catch((err) => {
                   
                });
             

          }
      },
    })


  }),
});

export const { useGetTeamsQuery, useAddTeamMutation,useUpdateTeamMemberMutation } = teamApi;
