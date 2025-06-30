import {createBrowserRouter,} from "react-router-dom";
import Layout from "../Layouts/Layout";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/Forms/SignIn";
import SignUp from "../Pages/Forms/SignUp";
import JobDetails from "../Pages/JobDetails/JobDetails";
import AddJob from "../Pages/AddJob/AddJob";
import MyPostedJobs from "../Pages/MyPostedJobs/MyPostedJobs";
import UpdateJob from "../Pages/UpdateJob/UpdateJob";
import PrivateRoute from "./PrivateRoute";
import MyBids from "../Pages/MyBids/MyBids";
import BidRequests from "../Pages/BidRequests/BidRequests";



const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement : <Error></Error>,
    children : [
      {
        path : '/',
        element : <Home></Home>,
      },
      {
        path : 'signIn',
        element : <SignIn></SignIn>
      },
      {
        path : 'signUp',
        element : <SignUp></SignUp>
      },
      {
        path : 'addJob',
        element : <PrivateRoute><AddJob></AddJob></PrivateRoute>
      },
      {
        path : 'myBids',
        element : <PrivateRoute><MyBids></MyBids></PrivateRoute>
      },
      {
        path : 'bidRequest',
        element : <PrivateRoute><BidRequests></BidRequests></PrivateRoute>
      },
      {
        path : 'myPostedJobs',
        element : <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
      },
      {
        path : 'updateJob/:id',
        element : <PrivateRoute><UpdateJob></UpdateJob></PrivateRoute>,
        loader : ({params}) => fetch(`http://localhost:5000/jobs/${params.id}`)
      },
      {
        path : 'jobDetails/:id',
        element : <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
        loader : ({params}) => fetch(`http://localhost:5000/jobs/${params.id}`)
        
      },
    ]
  },
]);
export default myRouter

//  console.log(import.meta.env.VITE_API_URL);