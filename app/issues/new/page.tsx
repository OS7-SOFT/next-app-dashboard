"use client";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm, Controller, Form } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import { useRouter } from "next/navigation";
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const form = useForm<IssueForm>();

  return (
    <form
      onSubmit={form.handleSubmit(async (data) => {
        await axios.post("http://localhost:3000/api/issues", data);
        router.push("/issues");
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
  );
};

export default NewIssuePage;
