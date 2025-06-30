import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
// import axios from "axios";
import RequestRow from "./RequestRow";
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";

const BidRequests = () => {
    const axiosSecure = useAxiosSecure()
    // const [bids, setBids] = useState([])
    // const [control, setControl] = useState(false);
    const {user} = useContext(AuthContext)
    // console.log(user.email);
    const queryClient = useQueryClient();
    
    // tanstack query use ---- for get data we use -- useQuery only.
    const {data : bids = [], isLoading, refetch} = useQuery({
        queryFn : ()=> getData(),
        queryKey : ['bids' , user?.email]
    })
    // console.log(bids);                                                              

    const getData = async () => {
        const {data} = await axiosSecure(`/bidRequest/${user?.email}`)
        return data
    }

    // here we use tanstack query thats why we comment it -------------
    // useEffect(()=>{
    //    axios.get(`http://localhost:5000/bidRequest/${user?.email}`)
    //    .then(data => setBids(data.data))
    // },[user, control])



   // tanstack query use ---- for update data we use -- useMutation only.
   const { mutateAsync } = useMutation({
       mutationFn : async ({id, status})=> {
          const {data} = await axiosSecure.patch(`/bid/${id}`, {status})
          console.log(data);
       },
        onSuccess : ()=> {
            alert('successfully update')
            // refetch() // invalidateQueries is a advance alternative of refetch. 
            queryClient.invalidateQueries({queryKey:['bids']})
        }
   })

    const handleUpdateStatus = async (id, prevStatus, status) =>{
        if(prevStatus === status) return alert('sorry')     
        await mutateAsync({id, status})
    }


    // const handleUpdateStatus = (id, prevStatus, status) =>{
    //     if(prevStatus === status) return alert('sorry')
    //     console.log(id, prevStatus, status)
    //     axiosSecure.patch(`/bid/${id}`, {status})
    //     .then(data => {
    //         console.log(data.data)
    //         setControl(!control)
    //     })
    // }


    if(isLoading) return <p className=" text-red-500">Data is still Loading........</p> 


    return (
        <div>
            <section className='container px-4 mx-auto pt-12'>
                <div className='flex items-center gap-x-3'>
                    <h2 className='text-lg font-medium text-gray-800 '>Bid Requests</h2>

                    <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                    {bids.length} Requests
                    </span>
                </div>

                <div className='flex flex-col mt-6'>
                    <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                        <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-50'>
                            <tr>
                                <th
                                scope='col'
                                className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                >
                                <div className='flex items-center gap-x-3'>
                                    <span>Title</span>
                                </div>
                                </th>
                                <th
                                scope='col'
                                className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                >
                                <div className='flex items-center gap-x-3'>
                                    <span>Email</span>
                                </div>
                                </th>

                                <th
                                scope='col'
                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                >
                                <span>Deadline</span>
                                </th>

                                <th
                                scope='col'
                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                >
                                <button className='flex items-center gap-x-2'>
                                    <span>Price</span>
                                </button>
                                </th>

                                <th
                                scope='col'
                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                >
                                Category
                                </th>

                                <th
                                scope='col'
                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                >
                                Status
                                </th>

                                <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200 '>
                                {
                                    bids.map(bid => <RequestRow key={bid._id} bid={bid} handleUpdateStatus={handleUpdateStatus}></RequestRow>)
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
        </div>
    );
};

export default BidRequests;