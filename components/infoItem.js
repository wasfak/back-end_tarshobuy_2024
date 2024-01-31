import React from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export default function InfoItem({ data }) {
  return (
    <div className="p-12">
      {data.length === 0 ? (
        <h1 className="text-center font-bold text-3xl">No Codes...</h1>
      ) : (
        <table
          className={`min-w-full bg-white border border-gray-300 text-left ${inter.className}`}
        >
          <thead>
            <tr>
              <th className="border border-gray-300 px-6 py-4">Code</th>
              <th className="border border-gray-300 px-6 py-4">Item</th>
              <th className="border border-gray-300 px-6 py-4">Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((code) => (
              <tr key={code._id}>
                <td className="border border-gray-300 px-6 py-4">
                  {code.code}
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  {code.name}
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  {code.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
