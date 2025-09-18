import React from "react";
import KelolaKostPage from "./KelolaKostPage";

const KelolaKost = async ({
  params,
}: {
  params: Promise<{ kostId: string }>;
}) => {
  const { kostId } = await params;

  return (
    <div>
      <KelolaKostPage kostId={kostId} />
    </div>
  );
};

export default KelolaKost;
