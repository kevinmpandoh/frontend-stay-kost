// app/kosts/[kostId]/page.tsx
import DetailKost from "./_components/DetailKost";

// export async function generateMetadata({
//   params,
// }: {
//   params: { kostId: string };
// }): Promise<Metadata> {
//   const kost = await kostService.getKostDetail(params.kostId);

//   console.log("Kost for metadata:", kost);

//   return {
//     title: `${kost.name} - Kost ${kost.type} di ${kost.city} | Stay Kost`,
//     description: kost.description
//       ? kost.description.slice(0, 160)
//       : `Sewa kost ${kost.type} di ${kost.city} dengan fasilitas lengkap dan harga terjangkau.`,
//     keywords: [
//       `kost ${kost.city}`,
//       `kost ${kost.type}`,
//       `kost murah ${kost.city}`,
//       `sewa kost ${kost.city}`,
//     ],
//     alternates: {
//       canonical: `https://www.staykost.my.id/kosts/${kost.slug}`,
//     },
//     openGraph: {
//       title: `${kost.name} - Kost ${kost.type} di ${kost.city}`,
//       description: kost.description,
//       url: `https://www.staykost.my.id/kosts/${kost.slug}`,
//       siteName: "Stay Kost",
//       images: kost.photos?.length
//         ? kost.photos.map((p: any) => ({
//             url: p.url,
//             width: 800,
//             height: 600,
//             alt: kost.name,
//           }))
//         : [
//             {
//               url: "https://www.staykost.my.id/og-image.jpg",
//               width: 1200,
//               height: 630,
//               alt: kost.name,
//             },
//           ],
//       locale: "id_ID",
//       type: "article",
//     },
//   };
// }

export default async function KostDetailPage({
  params,
}: {
  params: Promise<{ kostId: string }>;
}) {
  const { kostId } = await params;

  return <DetailKost kostId={kostId} />;
}
