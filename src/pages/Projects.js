import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import logo from "../assets/images/logo.png"
import Navigation from "../components/Navigation"
import ProjectCard from "../components/projects/ProjectCard"
import ProjectCategoryWrapper from "../components/projects/ProjectCategoryWrapper"
import ProjectHeader from "../components/projects/ProjectHeader"
import Loader from "../components/ui/loaders/TeamCardLoader"
import { useGetProjectsQuery, useUpdateProjectStatusMutation } from "../features/projects/projectsApi"

export default function Projects() {

    
    const [allProjectsData,setAllProjectsData] =  useState([])
    const [searchText,setSearchText] =  useState("")

    const {user} = useSelector(state => state.auth) || {}
            const {email : loggedEmail} = user || {}
            
    
    const category = ["Backlog","Ready","Doing","Review","Blocked","Done"]

                // eslint-disable-next-line no-unused-vars
                const {data:allProjects,isLoading,isError,error} = useGetProjectsQuery(loggedEmail)
                // eslint-disable-next-line no-unused-vars
                const [updateProjectStatus,{isLoading: isUpdateStatusLoading}] = useUpdateProjectStatusMutation()

                useEffect(() => {  
                    if(allProjects){
                        setAllProjectsData(allProjects)
                    }
                },[allProjects])

                const onDrop = (item,status) => {
                    
                    updateProjectStatus({
                        id:item?.id,
                        data:{
                            tag:status
                        },
                        email:loggedEmail
                    })
                    
                    setAllProjectsData(prevState => {
                        const updatedProject = prevState
                        .filter(el =>el.id !== item.id)
                     .concat({...item,tag:status})
                     return [...updatedProject]
                    })
                }

                const debounceHandler = (fn, delay) => {
                    let timeoutId;
                    return (...args) => {
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => {
                            fn(...args);
                        }, delay);
                    };
                };

                const doSearch = (value) => {
                        setSearchText(value)
                };

                const handleSearch = debounceHandler(doSearch, 500);


  return (
    <>
         <div
            className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
        >
            <Navigation handleSearch={handleSearch} />
            
            <div className="px-10 mt-6">
                <h1 className="text-2xl font-bold">Project Board</h1>
            </div>
            
            <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">

              

                {
                    category.map((category) => {
                       return(
                       
                       <div key={category} className="flex flex-col flex-shrink-0 w-72">
                                        <ProjectHeader stage={category} allProjectsData={allProjectsData}/>
                                        <ProjectCategoryWrapper status={category} onDrop={onDrop}>

                                        {isLoading ? (
                    <>
                      <Loader />
                      <Loader />
                    </>
                  ) : (
                    allProjectsData
                      .filter((el) => el.tag === category)
                      .sort((a, b) => b.timestamp - a.timestamp)
                      .map((data) => (
                        <ProjectCard
                          key={data.id}
                          projectInfo={data}
                          searchText={searchText}
                        />
                      ))
                  )}

                                        </ProjectCategoryWrapper>

                            </div>)
                    })
                }

            </div>
        </div>


        <a
            className="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-6 mr-4 text-blue-100 bg-indigo-600 rounded-full shadow-lg hover:bg-blue-600"
            href="https://learnwithsumit.com"
            target="_top"
        >
            <div
                className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full"
            >
                <img src={logo} alt="LWS Logo" />
            </div>
            <span className="ml-1 text-sm leading-none">Learn with Sumit</span>
        </a>
    
    </>
  )
}
