import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { BiEdit } from "react-icons/bi";

const EditButton = ({ issueId }: { issueId: string }) => {
  return (
    <Button>
      <BiEdit />
      <Link href={`/issues/${issueId}/edit`}>Edit</Link>
    </Button>
  );
};

export default EditButton;
