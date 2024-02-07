"use client";

import React, { useState } from "react";
import { FullCodeExample } from "./full-code-example";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmbedProps {
  lessonId: string;
}

export const Embed: React.FC<EmbedProps> = ({ lessonId }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div onClick={() => setShow(!show)} className="mb-4 cursor-pointer">
        <h2 className="text-lg font-medium">
          Embed This Content {show ? "-" : "+"}
        </h2>
        <div className="text-base text-muted-foreground">
          Check out here, how can you insert this questions into your website.
        </div>
      </div>

      {show && (
        <>
          <div className="prose max-w-none">
            Take Your Quizzes to the Next Level: Easy Embed for Your Website!
            <br />
            Ready to share your awesome quizzes and engage your website visitors
            like never before? Our powerful quiz generator lets you seamlessly
            embed your creations directly into your webpages! No coding magic
            required, just follow our simple steps and watch your audience take
            on the challenge.
            <br />
            <br />
            You only need to do 2 steps!
          </div>

          <p className="my-4">
            Inside the tag head (if possible), insert the script below.
          </p>
          <pre className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg mt-4 overflow-auto">
            <code className="language-html dark:font-light">
              {`<script defer src="https://quiz-english.com/iframe-loader.min.js"></script>`}
            </code>
          </pre>

          <p className="my-4">
            Now, place the following code snippet inside your HTML file at the
            location where you want the quiz to appear on your webpage.
          </p>
          <pre className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg mt-4 overflow-auto">
            <code className="language-html dark:font-light">
              {`<div id="your-quiz-container-1" style="height: 300px; margin: 30px auto; width: 50%;"></div>

<script>
window.onload = function () {
  loadIframe("your-quiz-container-1", "lessons/${lessonId}/play");
} ;
</script>
          `}
            </code>
          </pre>

          <p className="my-4">
            This example works on any website! It can be: HTML, React, Angular,
            Wordpress, Gatsby, ...
            <br />
            <Button asChild variant={'link'} className="ml-0 pl-0">
              <Link target="_blank" href={'https://github.com/henriqueweiand/quiz-english-embed'}>Check out the example code</Link>
            </Button>

            <Button asChild variant={'link'} className="ml-0">
              <Link target="_blank" href={'https://quiz-english-embed.vercel.app/'}>Real website example</Link>
            </Button>
            <br />
          </p>

          <hr />

          <FullCodeExample lessonId={lessonId} />
        </>
      )}
    </>
  );
};
