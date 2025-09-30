import { SectionTitle } from "./SectionTitle";

interface KostDescriptionProps {
  description: string;
}

export function KostDescription({ description }: KostDescriptionProps) {
  return (
    <div className="mt-6 space-y-6">
      <SectionTitle title="Deskripsi" />
      <p className="text-md leading-relaxed text-muted-foreground whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}
