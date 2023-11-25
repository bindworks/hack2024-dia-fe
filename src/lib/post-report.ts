import { z } from "zod";

export const uploadSchema = z.object({
  name: z.string(),
  patientId: z.string(),
  report: z.custom<File>().refine((v) => v instanceof File, "Prosím nahrajte validní soubor"),
});

export const postReport = async (data: z.infer<typeof uploadSchema>) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("patientId", data.patientId);
  formData.append("report", data.report);

  const response = await fetch("/api/scan", {
    method: "POST",
    body: formData,
  });

  return response.json() as {
    periodStart?: string;
    periodEnd?: string;
    /**
     * percentage from 0 to 100
     */
    timeActive?: number;
    /**
     * percentage from 0 to 100
     */
    timeInRangeVeryHigh?: number;
    /**
     * percentage from 0 to 100
     */
    timeInRangeHigh?: number;
    /**
     * percentage from 0 to 100
     */
    timeInRangeNormal?: number;
    /**
     * percentage from 0 to 100
     */
    timeInRangeLow?: number;
    /**
     * percentage from 0 to 100
     */
    timeInRangeVeryLow?: number;
    /**
     * mmol/l
     */
    averageGlucose?: number;
    /**
     * mmol/l
     */
    stddevGlucose?: number;
    /**
     * percentage from 0 to 100
     */
    variationCoefficient?: number;
    /**
     * mmol/mol
     */
    gmi?: number;
    /**
     * units
     */
    dailyInsulinDose?: number;
    /**
     * units
     */
    basalInsulin?: number;
    /**
     * units
     */
    correctionInsulin?: number;
    /**
     * units
     */
    bolusInsulin?: number;
  };
};
