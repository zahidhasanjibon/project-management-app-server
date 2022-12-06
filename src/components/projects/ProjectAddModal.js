
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateProjectMutation } from "../../features/projects/projectsApi";
import { useGetTeamsQuery } from "../../features/teams/teamsApi";


export default function AddProjectModal({ open, control }) {

    const [title,setTitle] = useState("")
    const [underTeam,setUnderTeam] = useState("")
    const [teamInProject,setTeamInProject] = useState({})

    const {user} = useSelector(state => state.auth) || {}

    // if refresh page getTeamsQuery request call

    const {data:allTeams,} =    useGetTeamsQuery(user?.email)
   
        const [createProject,{isSuccess}] = useCreateProjectMutation()



            const handleTeamSelection = (teamId) => {
                setUnderTeam(teamId)

                const selectTeam = allTeams?.find((el) => el.id.toString() === teamId)
                setTeamInProject(selectTeam)
               

            }
  
        useEffect(() => {
                if(isSuccess){
                    control()
                }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[isSuccess])


            const handleSubmit = (e) => {
                e.preventDefault()
                createProject({
                        creator: user,
                        title,
                        teamName:teamInProject?.name,
                        teamColor:teamInProject?.color,
                        teamMembers: teamInProject?.members,
                        tag: "Backlog",
                        timestamp: new Date().getTime()
                })
                setTitle("")
                setUnderTeam("")
            }


  return (
    open && (
      <>
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed absolute top-1/2 left-1/2 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
        >
          <div className=" p-4 w-full max-w-md h-full md:h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={control}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="authentication-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>

              </button>
              <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Create Project
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                     Project Title
                    </label>
                    <input
                      type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder=""
                      required
                    />
                  </div>
                  <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
<select required value={underTeam} onChange={e => handleTeamSelection(e.target.value)}  id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="">Select Team</option>
 {
        allTeams?.map((team,i) => (
            <option key={team.id} value={team.id}>{team.name}</option>
        ))
 }
</select>
                  </div>
                  <button
               
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                  Create Project
                  </button>
                  {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">{error?.data && error.data}</div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
