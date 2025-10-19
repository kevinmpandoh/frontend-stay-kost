export const dynamic = "force-dynamic";

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
