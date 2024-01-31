import React from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Info({ data }) {
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
            {data.map((item) =>
              item.codes.map((codeItem) => (
                <tr key={codeItem._id}>
                  <td className="border border-gray-300 px-6 py-4">
                    {codeItem.code}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    {codeItem.name}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    {codeItem.searchCount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
