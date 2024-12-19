import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { HeartCrack } from "lucide-react";
import { Button } from "./components/ui/button";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const ErrorBoundary = () => {
  const error = useRouteError();

  function getErrorMessage() {
    if (isRouteErrorResponse(error)) {
      return error.data;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return "Unknown Error";
    }
  }

  return (
    <div className="w-svw h-svh max-w-screen-sm mx-auto flex flex-col relative">
      <div className="select-none opacity-60 grow flex flex-col items-center justify-center gap-4">
        <HeartCrack className="size-12" />
        <h1>Aplikasi Rusak!</h1>
        <p>{getErrorMessage()}</p>
        <Link to="/">
          <Button variant="outline" title="Muat ulang">
            Muat ulang
          </Button>
        </Link>
      </div>
    </div>
  );
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
