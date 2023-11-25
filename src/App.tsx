import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../app/globals.css";
import { Layout } from "./components/layout";
import { HomePage } from "./pages/homepage";
import { Upload } from "./pages/upload";

const queryClient = new QueryClient();
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
      <Toaster></Toaster>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
