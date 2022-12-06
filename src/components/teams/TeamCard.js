
import convertColor from "../utils/convertColor";
import TeamCardFooter from "./TeamCardFooter";
import TeamCardHeader from "./TeamCardHeader";


export default function TeamCard({teamDetails}) {
  // const [collected,dragRef] = useDrag({
  //   type:"card",
  //   item:() => ({...teamDetails}),
  //   collect: (monitor: DragSourceMonitor) => ({
  //     isDragging: monitor.isDragging()
  //   }),
  //   end:(item,monitor) => {
  //     const dropResult = monitor.getDropResult()
  //     console.log(item);
  //     if(item && dropResult){
  //       console.log(dropResult);
  //       remove(item)
  //     }
  //   },
  // })




        const {name,desc,timestamp,color} = teamDetails || {}

     const rgba = convertColor(color)

  return (
    <>
        <div
            className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
            draggable="true"
       
        >
          <TeamCardHeader teamInfo={teamDetails}/>
        
            <span
                style={{color:color,backgroundColor:`rgba(${rgba[0]},${rgba[1]},${rgba[2]},.3)`}}
                className="flex items-center h-6 px-3 text-xs font-bold rounded-full"
                >{name}</span
            >
            <h4 className="mt-3 text-sm font-medium">
               {desc}
            </h4>
         <TeamCardFooter timestamp={timestamp}  teamInfo={teamDetails}/>
        </div>
    
    
    </>
  )
}
