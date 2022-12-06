import moment from "moment";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import convertColor from "../utils/convertColor";
import ProjectCardIcon from "./ProjectCardIcon";

export default function ProjectCard({projectInfo,searchText,updateLoading}) {


    const {teamName,teamColor,title,timestamp,creator,id,teamMembers} = projectInfo || {}

    const {user} = useSelector(state => state.auth) || {}
    const {email:loggedUserEmail} = user || {}
    const {email:creatorEmail} = creator || {}

            if(searchText === ""){
                searchText = undefined
            }
    const isHighlight = title.includes(searchText)

    const [collected,dragRef] = useDrag({
        type:"card",
        item:() => ({...projectInfo}),
        collect: (monitor: DragSourceMonitor) => ({
          isDragging: monitor.isDragging()
        }),
        end:(item,monitor) => {
          const dropResult = monitor.getDropResult()
          if(item && dropResult){
          }
        },
      })


      const rgba = convertColor(teamColor)
      

  return (
    <div
    ref={dragRef}
    
    className={`${isHighlight ? "border-2 border-blue-600" : ""} relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100`}
    draggable="true"
    style={{ opacity: collected.isDragging ? 0 : 1}}
>
   
        {
            projectInfo?.tag === "Backlog" &&  (loggedUserEmail === creatorEmail) && (
                <ProjectCardIcon id={id} email={creator?.email} />
            )
        }

    <span
     style={{color:teamColor,backgroundColor:`rgba(${rgba[0]},${rgba[1]},${rgba[2]},.3)`}}
        className="flex items-center h-6 px-3 text-xs font-bold text-pink-500 bg-pink-100 rounded-full "
        >{teamName}</span
    >
    <h4 className="mt-3 text-sm font-medium">
       {title}
    </h4>
    <div
        className="flex items-center w-full mt-3 text-xs font-medium text-gray-400"
    >
        <div className="flex items-center">
            <svg
                className="w-4 h-4 text-gray-300 fillCurrent"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                />
            </svg>
            <span className="ml-1 leading-none"
                >{moment(timestamp).format("MMM Do YY") }</span
            >
        </div>

        <img
            className="w-6 h-6 ml-auto rounded-full"
            src={creator?.avatar}
            alt="user"
        />
            

<select style={{backgroundColor:"#e4e4e4",border:"none",color:"blue",backgroundImage:"none",appearance:"none"}} className="absolute w-20 right-20 rounded-lg text-black text-sm  focus:ring-blue-500 focus:border-blue-500 block p-1.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="">members</option>
            {
                    teamMembers?.length > 0 && teamMembers.map((m,i) => (
                        <option key={i} disabled >{m}</option>
                    ))
            }
</select>


    </div>
</div>
  )
}
