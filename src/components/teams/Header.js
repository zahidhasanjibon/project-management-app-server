import { useState } from "react";

import CreateTeamModal from "./CreataeTeamModal";



export default function Header() {

    const [opened, setOpened] = useState(false);

    const controlModal = () => {
        setOpened((prevState) => !prevState);
    };

    // eslint-disable-next-line no-unused-vars
    // const [collectedProps, dropRef] = useDrop(() => ({
    //     accept:"card",
    //     drop: (item,monitor) => {
    //         console.log(item);
              
    //       },
    //   }))

  return (
   <>
   
   <div className="px-10 mt-6 flex justify-between">
        <h1 className="text-2xl font-bold">Teams</h1>
        <button onClick={controlModal}
            className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
        >
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
            </svg>
        </button>
    </div>

    <CreateTeamModal  open={opened} control={controlModal}/>
   </>
  )
}
