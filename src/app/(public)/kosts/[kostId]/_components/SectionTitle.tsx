export function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-lg sm:text-2xl font-semibold mb-4 text-slate-600">
      {title}
    </h2>
  );
}
