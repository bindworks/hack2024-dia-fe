import { Outlet } from "react-router-dom";
import { Logo } from "./logo";

export const Layout = () => {
  return (
    <div className="flex min-h-screen h-full w-screen justify-between items-center flex-col p-8">
      <div>
        <Outlet></Outlet>
      </div>
      <div className="opacity-30 scale-50 ">
        <Logo></Logo>
      </div>
    </div>
  );
};
