import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Калькулятор UNIT экономики",
  description: "Калькулятор UNIT экономики",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AntdRegistry>
            <main className="flex flex-col min-h-screen py-24">{children}</main>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
