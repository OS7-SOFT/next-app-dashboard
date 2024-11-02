"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller, Form } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState<any>("");
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("http://localhost:3000/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexepted error occurred.");
          }
        })}
      >
        <div className="max-w-xl space-y-3">
          <TextField.Root {...register("title")} placeholder="Title">
            <TextField.Slot></TextField.Slot>
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description..." {...field} />
            )}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default NewIssuePage;
