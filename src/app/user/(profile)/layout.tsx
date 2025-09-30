export const dynamic = "force-dynamic";

import SidebarUser from "@/components/SidebarUser";

// import { SetAuthUser } from "@/components/SetAuthUser";
// import { getUserFromServer } from "@/services/authServer.service";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUserFromServer();

  return (
    <>
      <SidebarUser />
      <section className="bg-white w-full rounded-lg border min-h-[556px] border-gray-200 px-10 py-8">
        {children}
      </section>
    </>
  );
}
