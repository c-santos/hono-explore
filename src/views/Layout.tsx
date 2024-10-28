import { FC, ReactNode } from 'hono/jsx';

type LayoutProps = {
  title?: string;
  children?: any | ReactNode;
};

const Layout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <html>
      <head>
        <title>{title ?? process.env.APP_TITLE}</title>
        <link />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
