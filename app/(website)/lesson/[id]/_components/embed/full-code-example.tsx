import React from 'react';

interface FullCodeExampleProps {
  lessonId: string;
}

export const FullCodeExample: React.FC<FullCodeExampleProps> = ({ lessonId }) => {
  return (
    <>
      <p className="my-4">
        Check out this full example below
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg mt-4 overflow-auto">
        <code className="language-html">
          {`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Embeddable Iframe Script example</title>
</head>
<body>
  <div id="iframe-container-1" style="height: 300px; margin: 30px auto; width: 50%;"></div>
  <div id="iframe-container-2" style="height: 300px; margin: 0 auto; width: 50%;"></div>

  <script defer src="https://read-smart-beta.vercel.app/iframe-loader.js"></script>

  <script>
    window.onload = function () {
      loadIframe("iframe-container-1", "lessons/${lessonId}/play");
      loadIframe("iframe-container-2", "lessons/${lessonId}/play");
    };
  </script>
</body>
</html>
          `}
        </code>
      </pre>

    </>
  );
};
