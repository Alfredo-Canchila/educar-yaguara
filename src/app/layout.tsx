import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Educar Yaguará | Transformando la educación",
  description: "Corporación Educativa, Cultural y Artística para la Enseñanza y el Desarrollo de la Niñez y la Juventud. Innovando la educación en Yaguará y el Sur Colombiano.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-educar-light)] text-[var(--color-educar-dark)]">{children}</body>
    </html>
  );
}
