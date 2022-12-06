
import { apiSlice } from "../api/apiSlice";
export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
        getProjects:builder.query({
            query:(email) => `/projects?teamMembers_like=${email}`
        }),

        getSingleProject:builder.query({
            query:(name) => `/projects?teamName_like=${name}`
        }),

      


    createProject:builder.mutation({
      query: (data) => ({
        url: `/projects`,
        method: "POST",
        body: data,
      }),
 
      async onQueryStarted(arg, {  dispatch,queryFulfilled}) {
        try {
          const projectData = await queryFulfilled
          if (projectData?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getProjects",
                  arg.creator.email,
                (draft) => {
                  draft.push(projectData.data);
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

  

    updateProjectTeamMembers:builder.mutation({
        query: ({ id, data,}) => ({
            url: `/projects/${id}`,
            method: "PATCH",
            body: data,
        }),
   
              }),
    updateProjectStatus:builder.mutation({
        query: ({ id, data,email}) => ({
            url: `/projects/${id}`,
            method: "PATCH",
            body: data,
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const projectData = await queryFulfilled;
            if (projectData?.data?.id) {
              
              dispatch(
                apiSlice.util.updateQueryData(
                  "getProjects",
                  arg.email,
                  (draft) => {
                   
                      const projectThatUpdate = draft.find(
                        // eslint-disable-next-line eqeqeq
                        (c) => c.id == arg.id.toString()
                        );
                        projectThatUpdate.tag = arg.data.tag
                        
                      }
                      )
                      );
                    }
                  } catch (error) {
                    console.log(error);
                  }
                },
              }),
              
              deleteProject:builder.mutation({
                query: ({id,email}) => ({
                  url: `/projects/${id}`,
                  method: "DELETE",
                }),
                async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                  try {
                    const projectData = await queryFulfilled;
            if (projectData) {
              
              dispatch(
                apiSlice.util.updateQueryData(
                  "getProjects",
                  arg.email,
                  (draft) => {
                    
                  
  
                 // eslint-disable-next-line eqeqeq
                 let index =  draft.findIndex(d => d.id == arg.toString())
                    
                      draft.splice(index,1)

                  }
                )
              );
            }
          } catch (error) {
            console.log(error);
          }
        },
    }),
  

  }),
});

export const { useCreateProjectMutation,useGetProjectsQuery,useUpdateProjectStatusMutation ,useDeleteProjectMutation,useGetSingleProjectQuery,useUpdateProjectTeamMembersMutation} = projectsApi;
