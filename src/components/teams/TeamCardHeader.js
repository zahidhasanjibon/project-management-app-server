import React, { useState } from 'react';

import AddMemberModal from './AddMemberModal';

export default function TeamCardHeader({teamInfo}) {

    const [opened, setOpened] = useState(false);

    const controlModal = () => {
        setOpened((prevState) => !prevState);
    };

    // eslint-disable-next-line no-unused-vars
  


  return (

    <>
    <div>
        <button onClick={controlModal}
    className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
>
    <svg
        className="w-4 h-4 fillCurrent"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
        />
    </svg>
</button> 
    </div>
   

    <AddMemberModal open={opened} control={controlModal} teamInfo={teamInfo}/>
</>
  )
}
