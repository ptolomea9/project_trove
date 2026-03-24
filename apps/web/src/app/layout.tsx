import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trove — Where Cards Come Alive",
  description:
    "The next-gen trading card marketplace. AI-powered 3D visualization, flat fees starting at 3%, and a community built on trust.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${chakra.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground font-[family-name:var(--font-chakra)]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
