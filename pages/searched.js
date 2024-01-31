import ResetConfirmationModal from "@/components/ResetConfirmationModal";
import InfoItem from "@/components/infoItem";
import React, { useState } from "react";

export default function Searched() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [count, setCount] = useState(null);
  const handelSubmit = async () => {
    const response = await fetch("/api/most-search", {
      method: "GET",
    });
    const res = await response.json();

    setData(res.topItems);
    setCount(res.count);
  };
  const handleReset = async () => {
    setModalOpen(true);
  };

  const handleConfirmReset = async () => {
    // Perform the reset
    const response = await fetch("/api/resetCount", {
      method: "POST",
    });

    if (response.ok) {
      // If the reset is successful, fetch the updated count
      handelSubmit();
    } else {
      console.error("Failed to reset count");
    }

    // Close the modal after the reset
    setModalOpen(false);
  };

  const handleCancelReset = () => {
    // Close the modal without resetting
    setModalOpen(false);
  };

  return (
    <div className="relative">
      <div className="text-black font-bold flex justify-center items-center ">
        {count && (
          <h1 className="text-4xl mt-2 absolute left-[40%] top-2">
            Total Search:{count}
          </h1>
        )}
      </div>

      <button
        onClick={handelSubmit}
        className="py-2 px-4 rounded-xl mt-4 bg-black text-white flex items-center ml-5"
      >
        Click
      </button>
      {data && <InfoItem data={data} />}
      <button
        onClick={handleReset}
        className="py-2 px-4 rounded-xl mt-4 bg-red-500 text-white flex items-center ml-5 mb-6"
      >
        Reset Count
      </button>
      <ResetConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelReset}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}
