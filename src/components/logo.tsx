import logoIcon from "../assets/Logo.svg";

export const Logo = () => (
  <div className="flex items-center">
    <img className="w-44" src={logoIcon} alt="" />
    <span className="font-nunito text-8xl text-stone-800">GlucoMiner</span>
  </div>
);
