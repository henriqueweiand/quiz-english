import React from 'react';
import { FullCodeExample } from './full-code-example';

interface EmbedProps {
  lessonId: string;
}

export const Embed: React.FC<EmbedProps> = ({ lessonId }) => {
  return (
    <>
      <h2 className="text-lg font-medium mb-4">Embed This Content</h2>
      <div className="prose max-w-none">
        Take Your Quizzes to the Next Level: Easy Embed for Your Website!<br />
        Ready to share your awesome quizzes and engage your website visitors like never before? 
        Our powerful quiz generator lets you seamlessly embed your creations directly into your webpages! 
        No coding magic required, just follow our simple steps and watch your audience take on the challenge.
        <br /><br />
        You only need to do 2 steps!
      </div>

      <p className="my-4">
        Inside the tag head (if possible), insert the script below.
      </p>
      <pre className="bg-gray-100 p-4 rounded-lg mt-4 overflow-auto">
        <code className="language-html">
{`<script defer src="https://read-smart-beta.vercel.app/iframe-loader.js"></script>`}
        </code>
      </pre>

      <p className="my-4">
        Now, place the following code snippet inside your HTML file at the location where you want the quiz to appear on your webpage.
      </p>
      <pre className="bg-gray-100 p-4 rounded-lg mt-4 overflow-auto">
        <code className="language-html">
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
        This example works on any website! It can be: HTML, React, Angular, Wordpress, Gatsby, ...<br />
        We are going to post more specific examples soon.<br />
      </p>

      <hr />

      <FullCodeExample lessonId={lessonId} />
    </>
  );
};
