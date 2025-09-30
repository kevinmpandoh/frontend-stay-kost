// app/kosts/[kostId]/page.tsx
import DetailKost from "./_components/DetailKost";

export default async function KostDetailPage({
  params,
}: {
  params: Promise<{ kostId: string }>;
}) {
  const { kostId } = await params;

  return <DetailKost kostId={kostId} />;
}
