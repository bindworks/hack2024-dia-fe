import { useState } from "react";

type Companies = "glooko" | "medtronic" | "libre" | "dexcom";
export const Help = () => {
  const [company, setCompany] = useState<Companies | undefined>();

  return (
    <>
      <div className="flex items-center flex-col">
        <h1 className="text-8xl font-nunito">Jak získat data?</h1>
        <p className="max-w-[500px] text-center text-2xl mb-8">Prosím vyberte typ vašeho přístroje</p>
      </div>
    </>
  );
};
