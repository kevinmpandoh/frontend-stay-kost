import Image from "next/image";
import React from "react";

interface EmptyStateProps {
  message: string;
  imageSrc?: string;
  imageAlt?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  imageSrc = "/Empty.svg",
  imageAlt = "Empty illustration",
}) => {
  return (
    <div className="text-muted-foreground flex flex-col items-center py-10 text-center">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={128}
          height={128}
          className="mb-4 h-32 w-32 object-contain"
        />
      )}
      <div>{message}</div>
    </div>
  );
};

export default EmptyState;
