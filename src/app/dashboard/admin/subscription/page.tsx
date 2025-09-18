"use client";
import React from "react";

import { useSubscription } from "@/features/subscription/hooks/useSubscription";
import TableSubscriptionAdmin from "./TableSubscriptionAdmin";
import PageHeader from "@/components/common/PageHeader";

const SubscriptionAdminPage = () => {
  const { getAllSubscription } = useSubscription();
  const { data, isLoading } = getAllSubscription;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-gray-500">Memuat data penyewa...</span>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Langganan Pemilik Kost" />

      <div className="rounded-lg bg-white p-6">
        {/* <div className="flex items-center justify-between space-y-6">
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Cari..."
              className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:ring focus:outline-none"
            />
          </div>
          <div className="flex items-start sm:items-center">
            <div className="flex w-full flex-wrap items-center gap-2">
              <button
                className={`bg-primary border-primary rounded border-2 px-2.5 py-1 font-semibold text-white`}
              >
                All
              </button>
              <button
                className={`rounded border-2 px-2.5 py-1 font-semibold text-[#5e6c84]`}
              >
                Pending
              </button>
              <button
                className={`rounded border-2 px-2.5 py-1 font-semibold text-[#5e6c84]`}
              >
                Success
              </button>
              <button
                className={`rounded border-2 px-2.5 py-1 font-semibold text-[#5e6c84]`}
              >
                Completed
              </button>
              <button
                className={`rounded border-2 px-2.5 py-1 font-semibold text-[#5e6c84]`}
              >
                Failed
              </button>
            </div>
          </div>
        </div> */}
        {!data || data.length === 0 ? (
          <h1>Tidak ADa</h1>
        ) : (
          <TableSubscriptionAdmin subscriptions={data} />
        )}
      </div>
    </>
  );
};

export default SubscriptionAdminPage;
