import Image from "next/image";

interface OwnerInfoProps {
  ownerName: string;
  ownerPhoto: string;
}

export function OwnerInfo({ ownerName, ownerPhoto }: OwnerInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 relative rounded-full overflow-hidden">
        <Image
          src={ownerPhoto}
          alt={ownerName || "Pemilik Kost"}
          fill
          className="object-cover"
        />
      </div>

      <div>
        <p className="font-medium">{ownerName}</p>
      </div>
    </div>
  );
}
