import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default async function ProfileTenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUserFromServer();

  return (
    <>
      {/* <ProtectedRoute allowedRoles={["tenant", "owner"]}>
        <Navbar />
        <main className="mx-auto flex max-w-7xl justify-center gap-8 px-6 py-6"> */}
      {children}
      {/* </main>
      </ProtectedRoute> */}
    </>
  );
}
