import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Secure Notes App",
  description: "Encrypted secure notes with OAuth login",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
