import { SectionTitle } from "./SectionTitle";

interface KostRulesProps {
  rules: string[];
}

export function KostRules({ rules }: KostRulesProps) {
  return (
    <div className="mt-6 space-y-6">
      <SectionTitle title="Peraturan Kost" />
      <ul className="list-disc pl-5 space-y-1 text-md text-muted-foreground">
        {rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </div>
  );
}
