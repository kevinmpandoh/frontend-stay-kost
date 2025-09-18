import React from "react";

import TenantDetailCard from "./CardDetailTenant";

const TenantDetailPage = async ({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) => {
  const { bookingId } = await params;
  return (
    <div className="max-w-2xl md:max-w-1/2 ">
      <h1 className="text-2xl font-bold mb-6">Detail Penyewa</h1>

      <TenantDetailCard bookingId={bookingId} />
    </div>
  );
};

export default TenantDetailPage;
