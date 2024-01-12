"use client";

import { Editor } from "@tinymce/tinymce-react";
import React from "react";

type Props = React.ComponentProps<typeof Editor>;

interface TinyMceProps extends Props {
  className?: string;
}

const TinyMce = React.forwardRef(({ ...props }: TinyMceProps, ref) => {
  return (
    <Editor
      {...props}
      apiKey="w8ounknkpw0mf3ocx7qijn18j7g6n7jd6hitne4y7ojpexm3"
      init={{
        height: 200,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "link",
          "image",
          "lists",
          "charmap",
          "preview",
          "anchor",
          "pagebreak",
          "searchreplace",
          "wordcount",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "emoticons",
          "help",
        ],
        toolbar:
          "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | link image | print preview media fullscreen | " +
          "forecolor backcolor emoticons | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
});

TinyMce.displayName = "TinyMce";

export default TinyMce;
