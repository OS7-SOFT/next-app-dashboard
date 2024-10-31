"use client";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <SimpleMDE placeholder="Description..." />
      <Button>Submit</Button>
    </div>
  );
};

export default NewIssuePage;
