import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./store/AuthProvider";
import Main from "./layouts/Main";

const Home = lazy(() => import("./pages/HomePage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const { user, loading } = useContext(AuthContext);

  console.log(user);

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
                element: <Suspense>{user ? <Dashboard /> : <Home />}</Suspense>,
              },
            ],
          },
        ])}
      />
    </>
  );
}

export default App;
