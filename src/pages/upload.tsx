import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { round } from "@/lib/helpers";
import { postReport, uploadSchema } from "@/lib/post-report";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash, UploadCloud } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UseMutationResult, useMutation } from "react-query";
import { Bar, BarChart, Legend, Tooltip } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { z } from "zod";

export type ChartTooltip = {
  payload?: {
    name?: NameType;
    color?: string;
    dataKey?: number | string;
    value?: ValueType;
  }[];
  label?: string;
};

const CustomTooltip = ({ payload, label }: ChartTooltip) => {
  if (!payload) {
    return null;
  }

  return (
    <div style={{ backgroundColor: "white", padding: "0.5rem" }}>
      {label && (
        <p style={{ padding: 0, margin: 0 }}>
          <b>In Range Parametry</b>
        </p>
      )}
      {[...payload].reverse().map((item, index) => (
        <p key={index} style={{ color: item.color, margin: 0, padding: 0 }}>
          <span style={{ fontWeight: "bold" }}>{item.name}:</span>
          &nbsp;
          <span>{item.value}%</span>
        </p>
      ))}
    </div>
  );
};

export const Upload = () => {
  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      name: " ",
      patientId: " ",
      report: "" as unknown as File,
    },
  });

  const mutations = useMutation(postReport, {
    onSuccess: (data) => {
      toast.success("Data úspěšně zpracována");
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Něco se pokazilo" + error);
    },
  });

  return (
    <div className="flex items-center flex-col">
      <h1 className="font-nunito text-6xl font-extrabold mb-8">{!mutations.isSuccess ? "Odesílání dat" : "Výsledek zpracování"}</h1>
      {mutations.isSuccess ? <DataDisplay data={mutations.data}></DataDisplay> : <UploadForm mutations={mutations} form={form}></UploadForm>}
    </div>
  );
};

const DataDisplay = ({ data }: { data: Awaited<ReturnType<typeof postReport>> }) => {
  const { timeInRangeHigh, timeInRangeLow, timeInRangeNormal, timeInRangeVeryHigh, timeInRangeVeryLow, ...rest } = data;

  const parameters = [
    {
      name: "In range parametry",
      "Velmi Vysoká Hladina": timeInRangeVeryHigh,
      "Vysoká Hladina": timeInRangeHigh,
      "V cíli": timeInRangeNormal,
      "Nízká Hladina": timeInRangeLow,
      "Velmi Nízká Hladina": timeInRangeVeryLow,
    },
  ];

  return (
    <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-background p-4 gap-3 flex items-center flex-col rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">In range parametry</h2>
        <BarChart width={500} height={500} data={parameters}>
          <Tooltip wrapperStyle={{ outline: "none" }} content={CustomTooltip} />
          <Legend />
          <Bar dataKey="Velmi Nízká Hladina" stackId="a" fill="#c00007" />
          <Bar dataKey="Nízká Hladina" stackId="a" fill="#ff7177" />
          <Bar dataKey="V cíli" stackId="a" fill="#65bf1c" />
          <Bar dataKey="Vysoká Hladina" stackId="a" fill="#ffec46" />
          <Bar dataKey="Velmi Vysoká Hladina" stackId="a" fill="#ff7b00" />
        </BarChart>
      </div>
      <div className="bg-background p-4 gap-3 flex items-center flex-col rounded-lg w-full shadow-lg">
        <h2 className="text-2xl font-bold">Ostatní data</h2>
        <Table>
          <TableBody>
            <TableRow className="w-full">
              <TableCell>Datum</TableCell>
              <TableCell>
                {new Date(rest.periodStart as string).toLocaleDateString()} - {new Date(rest.periodEnd as string).toLocaleDateString()}
              </TableCell>
            </TableRow>
            <TableRow className="w-full">
              <TableCell>Aktivní čas</TableCell>
              <TableCell>{round(rest.timeActive)}&nbsp;%</TableCell>
            </TableRow>
            <TableRow className="w-full">
              <TableCell>Průměrná glukóza</TableCell>
              <TableCell>{round(rest.averageGlucose)}&nbsp;mmol/l</TableCell>
            </TableRow>
            <TableRow className="w-full">
              <TableCell>Směrodatná odchylka</TableCell>
              <TableCell>{round(rest.stddevGlucose)}&nbsp;mmol/l</TableCell>
            </TableRow>
            <TableRow className="w-full">
              <TableCell>Koeficient variace</TableCell>
              <TableCell>{round(rest.variationCoefficient)}&nbsp;%</TableCell>
            </TableRow>
            <TableRow className="w-full">
              <TableCell>GMI</TableCell>
              <TableCell>{round(rest.gmi)}&nbsp;mmol/mol</TableCell>
            </TableRow>
            {rest.dailyInsulinDose && (
              <TableRow className="w-full">
                <TableCell>Denní dávka inzulinu</TableCell>
                <TableCell>{round(rest.timeActive)}&nbsp;j.</TableCell>
              </TableRow>
            )}
            {rest.basalInsulin && (
              <TableRow className="w-full">
                <TableCell>Denní dávka inzulinu</TableCell>
                <TableCell>{round(rest.basalInsulin)}&nbsp;j.</TableCell>
              </TableRow>
            )}
            {rest.bolusInsulin && (
              <TableRow className="w-full">
                <TableCell>Denní dávka inzulinu</TableCell>
                <TableCell>{round(rest.bolusInsulin)}&nbsp;j.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const UploadForm = ({
  mutations,
  form,
}: {
  mutations: UseMutationResult<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    unknown,
    {
      name: string;
      patientId: string;
      report: File;
    },
    unknown
  >;
  form: UseFormReturn<
    {
      name: string;
      patientId: string;
      report: File;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
}) => {
  const onSubmit: SubmitHandler<z.infer<typeof uploadSchema>> = (data) => {
    mutations.mutate(data);
  };
  const onDrop = useCallback((files: File[]) => {
    form.setValue("report", files[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const report = form.getValues("report");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-[400px]">
        <FormField
          control={form.control}
          name="name"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Jméno</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormMessage>{formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="patientId"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Rodné Číslo</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormMessage>{formState.errors.patientId?.message}</FormMessage>
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="report"
          render={({ formState }) => (
            <FormItem>
              {report ? (
                <div className="border bg-background flex items-center justify-between p-4 rounded-lg">
                  <span className="font-bold">{report.name}</span>
                  <div className="flex items-center">
                    <span>{report.size / 1000}Kb</span>
                    <Button type="button" size="icon" className="ml-1" onClick={() => form.resetField("report")}>
                      <Trash></Trash>
                    </Button>
                  </div>
                </div>
              ) : (
                <div {...getRootProps()} className="border border-stone-800 items-center p-4 border-dashed flex w-full  flex-col gap-3 rounded-lg bg-background">
                  <input {...getInputProps()} />
                  <UploadCloud />
                  <p>Nahrajte kliknutím nebo přetažením</p>
                  <p className="text-stone-700 text-sm">PDF (max 10mb)</p>
                </div>
              )}
              <FormMessage>{formState.errors.report?.message}</FormMessage>
            </FormItem>
          )}
        ></FormField>

        <Button type="submit" className="w-full" disabled={mutations.isLoading}>
          Nahrát data
        </Button>
      </form>
    </Form>
  );
};
