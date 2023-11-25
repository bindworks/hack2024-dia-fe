import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../app/globals.css";
import { HomePage } from "./pages/homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
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
