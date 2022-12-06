
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateTeamMemberMutation } from "../../features/teams/teamsApi";
import { useGetUserQuery, userApi } from "../../features/user/userApi";
import Error from "../ui/Error";
import isValidEmail from "../utils/isValidEmail";


export default function AddMemberModal({ open, control ,teamInfo}) {

    const dispatch = useDispatch()

    const [memberToAdd,setMemberToAdd] = useState("")
    const [userCheck,setUserCheck] = useState(false)
    const [responseError,setResponseError] = useState("")
    const [memberExist,setMemberExist] = useState(undefined)


    const {user} = useSelector(state => state.auth) || {}
    const  {email:myEmail} = user || {}
   
        const {data:userToAdd,refetch} = useGetUserQuery(memberToAdd,{
            skip:!userCheck
        })

            const [updateTeamMember,{isSuccess:addMemberSuccess}] = useUpdateTeamMemberMutation()


        useEffect(() => {
            if (userToAdd?.length > 0 && userToAdd[0].email !== myEmail) {
                // check member existance
              
                dispatch(
                    userApi.endpoints.getMember.initiate({email:memberToAdd,id:teamInfo?.id},{
                        forceRefetch:true,
                    })
                )
                    .unwrap()
                    .then((data) => {
                          
                        setMemberExist(data)
                    })
                    .catch((err) => {
                        setResponseError("There was a problem!");
                    });
            }else {
         
                setMemberExist([])
            }
         

        }, [userToAdd, dispatch, myEmail,memberToAdd,teamInfo]);


        useEffect(() => {
                if(addMemberSuccess){
                    control()
                }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[addMemberSuccess])

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
        if (isValidEmail(value)) {
            setMemberToAdd(value);
            setUserCheck(true);
            refetch()
        }else {
            setMemberToAdd("")
        }
    };

    const handleSearch = debounceHandler(doSearch, 500);

            const handleSubmit = (e) => {
                e.preventDefault()
                if(memberExist?.length === 0){
                  const {email,avatar} = userToAdd[0] || {}
                     updateTeamMember({
                            id:teamInfo?.id,
                            data:{
                              membersAvatar:[...teamInfo?.membersAvatar,{email,avatar}],
                                members:[...teamInfo?.members,memberToAdd
                                ]
                            }
                    })
                }

                setMemberToAdd("")

              
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
                  Add New Member
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Enter User Email
                    </label>
                    <input
                    autoComplete="on"
                      type="email"
                      onChange={(e) =>
                        handleSearch(e.target.value)
                    }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder=""
                      required
                    />
                  </div>

                  <div>
                   {userToAdd?.length === 0 && memberToAdd?.length > 1 && <Error message="user dosent exist" />}
                   {responseError && <Error message={responseError} />}
                   {userToAdd?.length > 0 &&
                        userToAdd[0].email === myEmail && (
                                <Error message="You have already in this team!" />
                            )}
                   {memberExist?.length > 0 && memberToAdd?.length > 0 && userToAdd?.length > 0 &&
                                    (
                                <Error message="this member has already in this team" />
                            )}
                   {userToAdd?.length > 0 && memberToAdd?.length > 1 && (
                        <div className="flex items-center pl-3 py-2 shadow-md">
                                <img className="w-9 h-9 rounded-full" src={userToAdd[0]?.avatar} alt="user" />
                                <span className="ml-3 text-white">{userToAdd[0]?.email}</span>
                        </div>
                   )}
                  </div>
              
                
                  <button
                        disabled={ memberExist === undefined ||
                            (userToAdd?.length > 0 &&
                                userToAdd[0].email === myEmail) || (memberExist?.length > 0)}
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                  Add Member
                  </button>
                  {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">{error?.data && error.data}</div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
