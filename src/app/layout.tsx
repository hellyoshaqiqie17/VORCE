import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClickDown™ | One app to replace them all",
  description: "All of your work in one place: Tasks, Docs, Chat, Goals, & more.",
  keywords: "ClickDown, project management, tasks, docs, chat, goals",
  authors: [{ name: "Click Down" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts - Montserrat */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Google Material Icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link rel="icon" href="/next.svg" type="image/svg+xml" />
        {/* Mapbox GL CSS */}
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
