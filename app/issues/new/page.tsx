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
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState<any>("");
  const [isSubmtion, setSubmtion] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("OSmama");
      setSubmtion(true);
      await axios.post("http://localhost:3000/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmtion(false);
      setError("An unexepted error occurred.");
    }
  });

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit}>
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
          <Button disabled={isSubmtion}>
            {isSubmtion ? <Spinner /> : "Create Issue"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewIssuePage;
