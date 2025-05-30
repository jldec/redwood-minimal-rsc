import styles from "./styles.css?url";

export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log('Document RSC')
  return (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>RedwoodSDK minimal RSC Demo</title>
      <link rel="stylesheet" href={styles} />
      <link rel="icon" href="/favicon.jpg" />
    </head>
    <body>
      <div id="root">{children}</div>
    </body>
  </html>
)};
