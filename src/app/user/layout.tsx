export const dynamic = "force-dynamic";

import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";
import SidebarUser from "@/components/SidebarUser";

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
        <main className="mx-auto mb-20 flex max-w-7xl flex-col gap-8 px-6 py-6 sm:mb-0 lg:flex-row">
          <SidebarUser />
          <section className="min-h-[556px] w-full rounded-lg bg-white px-0 py-0 sm:border sm:border-gray-200 sm:px-10 sm:py-8">
            {children}
          </section>
        </main>
      </ProtectedRoute>
    </>
  );
}
