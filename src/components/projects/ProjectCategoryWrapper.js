
import { useDrop } from 'react-dnd';



export default function ProjectCategoryWrapper({onDrop,status,children}) {
 
  const [collectedProps, dropRef] = useDrop(() => ({
    accept:"card",
    drop: (item,monitor) => {
          onDrop(item,status)
      },
  }))


  return (
                    <div ref={dropRef}{...collectedProps} className="flex flex-col pb-2 overflow-auto h-full">
                      
                       {children}
                    </div>
  )
}
