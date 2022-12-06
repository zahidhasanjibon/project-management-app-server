
import moment from "moment";
import { useState } from "react";
import TeamMembersModal from "./TeamMembersModal";
export default function TeamCardFooter({timestamp,teamInfo}) {

    const [opened, setOpened] = useState(false);

    const controlModal = () => {
        setOpened((prevState) => !prevState);
    };


  return (
    <>
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
        <span className="ml-1 leading-none">{moment(timestamp).format("MMM Do YY") }</span>
        <button onClick={controlModal} className="text-blue-700 absolute right-6">show members</button>
    </div>
</div>
<TeamMembersModal open={opened} control={controlModal} teamInfo={teamInfo} />
</>
  )
}
