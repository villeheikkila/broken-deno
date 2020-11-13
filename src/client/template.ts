const template = (children: string) => `<html>
      <head>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <main id="app">${children}</main>
      </body>
    </html>`;

export default template;
