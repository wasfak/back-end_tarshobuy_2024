import React from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export default function Footer() {
  return (
    <footer
      className={`min-w-screen border-t-0 p-8 flex items-center justify-center font-bold  ${inter.className}`}
    >
      Made by Wasfy @{new Date().getFullYear()}
    </footer>
  );
}
