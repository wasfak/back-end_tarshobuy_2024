import Link from "next/link";
import React from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export default function Navbar() {
  const path = usePathname();

  return (
    <div
      className={`w-full bg-[#b6373e] text-white flex justify-center items-center  p-6
     ${inter.className}`}
    >
      <div className="px-4 ">
        <Link
          href="/"
          className={`mx-6 ${
            path === "/" ? "font-bold text-black duration-200 ease-in-out" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/searched"
          className={`mx-6 ${
            path === "/searched"
              ? "font-bold text-black duration-200 ease-in-out"
              : ""
          }`}
        >
          Data
        </Link>
        <Link
          href="/upload"
          className={`mx-6 ${
            path === "/upload"
              ? "font-bold text-black duration-200 ease-in-out"
              : ""
          }`}
        >
          Upload
        </Link>
      </div>
    </div>
  );
}
