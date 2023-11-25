import logoIcon from "../assets/Logo.svg";

export const Logo = () => (
  <div className="flex flex-col lg:flex-row justify-items-center items-center">
    <img className="w-24 lg:w-44" src={logoIcon} alt="" />
    <span className="font-nunito text-6xl text-stone-800">GlucoMiner</span>
  </div>
);
