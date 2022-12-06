import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddTeamMutation } from "../../features/teams/teamsApi";

export default function CreateTeamModal({ open, control }) {

    const [teamName,setTeamName] = useState("")
    const [desc,setDesc] = useState("")
    const [color,setColor] = useState("")

    const {user} = useSelector(state => state.auth) || {}
    const  {email,avatar} = user || {}



        const [addTeam,{isSuccess,error}] = useAddTeamMutation()


        useEffect(() => {
                if(isSuccess){
                    control()
                }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[isSuccess])


            const handleSubmit = (e) => {
                e.preventDefault()

                addTeam({
                        name:teamName,
                        ownerEmail:email,
                        members:[email],
                        membersAvatar:[{email,avatar}],
                        desc,
                        color,
                        timestamp:new Date().getTime()

                })
                setTeamName("")
                setColor("")
                setDesc("")

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
                  Create New Team
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Team Name
                    </label>
                    <input
                      type="text"
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder=""
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Team Description
                    </label>
                    <input
                      type="text"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Choose Color
                    </label>
                    <input
        
                      type="color"   
                    
                      value={color}
                        onChange={e => setColor(e.target.value)}
                      placeholder="ex: red or #634627 or rgba(5,3,7)"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                
                  <button
               
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                  Create Team
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">{error?.data && error.data}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
