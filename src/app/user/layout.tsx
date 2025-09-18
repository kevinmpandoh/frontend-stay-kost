export const dynamic = "force-dynamic";

import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";

// import { SetAuthUser } from "@/components/SetAuthUser";
// import { getUserFromServer } from "@/services/authServer.service";

export default async function ProfileTenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUserFromServer();

  return (
    <>
      <ProtectedRoute allowedRoles={["tenant"]}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row gap-8">
          {children}
        </main>
      </ProtectedRoute>
    </>
  );
}
