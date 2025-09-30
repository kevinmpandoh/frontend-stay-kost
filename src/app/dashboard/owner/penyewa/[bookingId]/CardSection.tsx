// components/CardSection.tsx

import { Card } from "@/components/ui/card";

const CardSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </Card>
  );
};

export default CardSection;
