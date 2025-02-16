import Blog from './blog'
import Signup from './signup'
import Login from './login'
import Home from './home'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
function App() {

  const route=createBrowserRouter([
    {
      path:"/",
      element:<Home/>

    },
    {
      path:"/Login",
      element:<Login/>

    },
    {
      path:"/Signup",
      element:<Signup/>

    },
    {
      path:"/Blog",
      element:<Blog/>

    }
  ])

  return (
    <>
      <RouterProvider router={route}/>
    </>
  )
}

export default App
