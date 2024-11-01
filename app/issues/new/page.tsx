"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller, Form } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createIssueSchema } from "@/app/validationSchema";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState<any>("");
  const router = useRouter();
  const form = useForm<IssueForm>();

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={form.handleSubmit(async (data) => {
          try {
            await axios.post("http://localhost:3000/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexepted error occurred.");
          }
        })}
      >
        <div className="max-w-xl space-y-3">
          <TextField.Root {...form.register("title")} placeholder="Title">
            <TextField.Slot></TextField.Slot>
          </TextField.Root>
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description..." {...field} />
            )}
          />

          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default NewIssuePage;
