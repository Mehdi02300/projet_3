import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./store/AuthProvider";
import Main from "./layouts/Main";

const Home = lazy(() => import("./pages/HomePage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <ToastContainer theme="dark" position="bottom-right" />
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: <Main />,
            children: [
              {
                path: "/",
                element: <Suspense> {user ? <Dashboard /> : <Home />} </Suspense>,
              },
              {
                path: `/profile/:userId`,
                element: (
                  <Suspense>
                    <Profile />
                  </Suspense>
                ),
              },
            ],
          },
        ])}
      />
    </>
  );
}

export default App;
