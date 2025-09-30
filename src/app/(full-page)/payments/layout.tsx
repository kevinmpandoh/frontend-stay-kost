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
      <ProtectedRoute allowedRoles={["tenant", "owner"]}>
        <Navbar />
        <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-6 lg:flex-row">
          {children}
        </main>
      </ProtectedRoute>
    </>
  );
}
