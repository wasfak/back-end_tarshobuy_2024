import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [name, setName] = useState("");
  const [searched, setSearched] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // New state to handle errors

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d+$/.test(inputValue)) {
      setCode(inputValue);
    } else {
      // Display an error message or handle it as needed
      setError("برجاء كتابة الكود فقط");
      setCode("");
      setResponse("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendDataToBackend();
    }
  };

  const handleClick = () => {
    setIsLoading(true);
    sendDataToBackend();
    setIsLoading(false);
  };
  const pharmacy = "elgam3a";

  const sendDataToBackend = async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      const params = new URLSearchParams({ code, pharmacy });

      const response = await fetch(`/api/search?${params.toString()}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();

      if (res.message === "archived") {
        setResponse("Archived");
        setName("");
        setSearched("");
      } else {
        setResponse(res.foundCode.Notes);
        setName(res.foundCode.name);
        setSearched(res.foundCode.searched);
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>صيدليات ال عبد اللطيف الطرشوبى</title>
      </Head>

      <main
        className={`mb-16 flex flex-col items-center p-24 h-[68vh] ${inter.className}`}
      >
        <p>Please enter the code</p>
        <div className="flex flex-col items-center m-4">
          <input
            type="text"
            value={code}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter code"
            className="appearance-none bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
          />
          <button
            disabled={loading}
            onClick={handleClick}
            className="py-2 px-4 rounded-2xl mt-6 bg-black text-white flex items-center"
          >
            {loading ? "Searching..." : "Search"}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {response && (
            <>
              {name ? (
                <>
                  <h1 className="mt-4 capitalize font-bold text-3xl">
                    {response}
                  </h1>
                  <h1
                    className="mt-4 capitalize font-bold text-3xl"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {name}
                  </h1>
                </>
              ) : (
                <h1 className="mt-4 capitalize font-bold text-3xl">
                  {response}
                </h1>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
