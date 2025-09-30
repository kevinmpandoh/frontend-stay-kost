// app/(main)/kosts/page.tsx
import KostListHeader from "@/features/kost/kost-list/KostListHeader";
import KostFilterTags from "@/features/kost/kost-list/KostFilterTags";
import KostFilterModal from "@/features/kost/kost-list/KostFilterModal";
import KostList from "@/features/kost/kost-list/KostList";
import { Suspense } from "react";

export default function KostListPage() {
  return (
    <div className="mx-auto my-10 max-w-6xl p-4">
      <Suspense>
        <KostListHeader />
        <KostFilterTags />
        <KostFilterModal />
        <KostList />
      </Suspense>
    </div>
  );
}
