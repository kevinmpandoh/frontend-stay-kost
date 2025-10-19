// app/(public)/kost/[kostId]/booking/page.tsx

import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import BookingTenant from "./components/BookingTenant";
interface BookingPageProps {
  params: Promise<{ kostId: string }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { kostId } = await params;

  return (
    <ProtectedRoute allowedRoles={["tenant"]}>
      <div className="mx-auto flex max-w-6xl flex-col-reverse p-4 md:flex-row">
        <BookingTenant kostId={kostId} />
      </div>
    </ProtectedRoute>
  );
}
