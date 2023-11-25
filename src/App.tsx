import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../app/globals.css";
import { Layout } from "./components/layout";
import { HomePage } from "./pages/homepage";
import { Upload } from "./pages/upload";

const router = createBrowserRouter([
  {
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/upload",
        element: <Upload></Upload>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
