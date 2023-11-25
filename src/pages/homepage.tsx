import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { HelpCircle, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="flex w-screen justify-center items-center flex-col p-8">
      <Logo></Logo>
      <p className="max-w-[500px] text-center text-2xl mb-8">Náhravání dat z glukometrů, sensorů a pump snadněji.</p>
      <div className="w-[400px] flex flex-col gap-4">
        <Button variant="default" size="lg" className="gap-2 font-bold w-full" asChild>
          <Link to="/upload">
            <Upload />
            Už mám výkaz k nahrání
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="gap-2 font-bold w-full border-red-500 border-2" asChild>
          <Link to="https://www.ikem.cz/cs/centrum-diabetologie/edukacni-materialy/a-3602/">
            <HelpCircle />
            Ještě nevím jak výkaz získám
          </Link>
        </Button>
      </div>
    </div>
  );
};
