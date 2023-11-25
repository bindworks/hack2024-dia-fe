import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const uploadSchema = z.object({
  name: z.string(),
  patientId: z.string(),
  report: z.custom<File>().refine((v) => v instanceof File, "Prosím nahrajte validní soubor"),
});

export const Upload = () => {
  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      name: " ",
      patientId: " ",
      report: "" as unknown as File,
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof uploadSchema>> = (data) => console.log(data);

  const onDrop = useCallback((files: File[]) => {
    form.setValue("report", files[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const report = form.getValues("report");

  return (
    <div className="flex items-center flex-col">
      <h1 className="font-nunito text-8xl">Odesílání dat</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-[400px]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jméno</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rodné Číslo</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="report"
            render={() => (
              <FormItem>
                {report ? (
                  <div className="border bg-background flex items-center justify-between p-4 rounded-lg">
                    <span className="font-bold">{report.name}</span>
                    <span>{report.size / 1000}Kb</span>
                  </div>
                ) : (
                  <div {...getRootProps()} className="border border-stone-800 items-center p-4 border-dashed flex w-full  flex-col gap-3 rounded-lg bg-background">
                    <input {...getInputProps()} />
                    <UploadCloud />
                    <p>Nahrajte kliknutím nebo přetažením</p>
                    <p className="text-stone-700 text-sm">PDF (max 10mb)</p>
                  </div>
                )}
              </FormItem>
            )}
          ></FormField>

          <Button type="submit" className="w-full">
            Nahrát data
          </Button>
        </form>
      </Form>
    </div>
  );
};
