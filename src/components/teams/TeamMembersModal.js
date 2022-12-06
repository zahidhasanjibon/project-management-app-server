
import React from 'react';

export default function TeamMembersModal({ open, control ,teamInfo}) {
   
        const {ownerEmail,membersAvatar} = teamInfo || {}

        const setDesgnation = (email) => {
                    if(email === ownerEmail){
                        return 'Owner'
                    } else {
                        return "Member"
                    }
        }

  return (
     open && (
        <>
            <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed w-full h-full inset-0 z-10 cursor-pointer"
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
                  Members List
                </h3>
                <div className="p-6">
            
                <ul className="my-4 space-y-3">
                  
                   {
                    membersAvatar?.length > 0 && membersAvatar.map((mem,i) => (

                        <li key={i}>
                        <span className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                        <img className="w-9 h-9 rounded-full"
                               src={mem.avatar} 
                alt="userimg"
            />
                            <span className="flex-1 ml-3 whitespace-nowrap">{mem.email}</span>
                            <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">{setDesgnation(mem.email)}</span>
                        </span>
                    </li>
                    ))
                   } 
                   
                </ul>
              
            </div>
              </div>
            </div>
          </div>
        </div>
        </>
     )
   
  )
}

