import { LucideIcon, Triangle } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  iconBg: string;
  description?: string;
  title: string;
  value: number | string;
}

const StatCard = ({
  icon: Icon,
  iconBg,
  description,
  title,
  value,
}: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Icon size={36} className={iconBg} />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-gray-800">{value || "0"}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
