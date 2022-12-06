

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTeamsQuery } from "../../features/teams/teamsApi";
import { addAllTeams } from "../../features/teams/teamSlice";
import TeamCardLoader from "../ui/loaders/TeamCardLoader";
import TeamCard from "./TeamCard";

export default function TeamCardWrapper() {
    const [error, setError] = useState("");
            const dispatch = useDispatch()
        const {user} = useSelector(state => state.auth) || {}
        const {email} = user || {}


     const {data:allTeams,isError,isLoading,error:responseError} =    useGetTeamsQuery(email)

            useEffect(() => {
                    if(responseError?.data){
                        setError(responseError.data)
                    }
            },[responseError,])

            useEffect(() => {
                if(allTeams?.length > 0){
                    dispatch(addAllTeams(allTeams))

                }
            },[allTeams,dispatch])

            // decide what to render

            let content = null

        if(isLoading ){
            content = <>
                <TeamCardLoader />
                <TeamCardLoader />
                <TeamCardLoader />
                <TeamCardLoader />
            </>
        }else if(!isLoading && !isError && allTeams?.length === 0) {
           content =  <h4>No teams found</h4>
        } else if(error){
              content =   <h4>{error}</h4>
        }
        else if(!isLoading && !isError && allTeams?.length > 0){
           
            content = allTeams.map(team => (
                  <TeamCard key={team.id} teamDetails={team} />
            ))
        }

    

  return (
    <>
    
    <div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto"
    >
           {content}

        </div>
    
    </>
  )
}
