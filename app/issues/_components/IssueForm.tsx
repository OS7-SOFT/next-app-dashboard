"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage, Spinner } from "@/app/components";
import { Issue } from "@prisma/client";
import dynamic from "next/dynamic";
import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState<any>("");
  const [isSubmtion, setSubmtion] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmtion(true);
      if (issue) await axios.put("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);

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
          <TextField.Root
            defaultValue={issue?.title}
            {...register("title")}
            placeholder="Title"
          >
            <TextField.Slot></TextField.Slot>
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            name="description"
            defaultValue={issue?.description}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description..." {...field} />
            )}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Button disabled={isSubmtion}>
            {issue ? "Update Issue" : "Create Issue"}{" "}
            {isSubmtion && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
