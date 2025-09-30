export const dynamic = "force-dynamic";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ScrollToTopButton from "@/components/common/ScrollToTop";
import AuthProtected from "@/components/HOC/AuthProtected";
// import { SetAuthUser } from "@/components/SetAuthUser";
// import { getUserFromServer } from "@/services/authServer.service";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUserFromServer();

  return (
    <>
      <AuthProtected>{children}</AuthProtected>
    </>
  );
}
