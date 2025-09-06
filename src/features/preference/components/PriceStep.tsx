import { Input } from "@/components/ui/input";

import { usePreferenceStore } from "../preference.store";
import { formatCurrency } from "@/lib/format";

const parseCurrency = (formatted: string) => {
  return formatted.replace(/[^\d]/g, "");
};

export default function PriceStep() {
  const price = usePreferenceStore((state) => state.price);
  const setPrice = usePreferenceStore((state) => state.setPrice);

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block">Harga Minimum</label>
        <div className="relative w-full">
          <span className="text-md text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 font-semibold">
            Rp{" "}
          </span>
          <Input
            type="text"
            inputMode="numeric"
            value={formatCurrency(price.min)}
            onChange={(e) => setPrice({ min: parseCurrency(e.target.value) })}
            className="rounded p-6 pl-12 text-gray-600 md:text-sm"
            placeholder="Contoh: 1000000"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block">Harga Maksimum</label>
        <div className="relative w-full">
          <span className="text-md text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 font-semibold">
            Rp{" "}
          </span>
          <Input
            type="text"
            inputMode="numeric"
            value={formatCurrency(price.max)}
            onChange={(e) => setPrice({ max: parseCurrency(e.target.value) })}
            className="rounded p-6 pl-12 text-gray-600 md:text-sm"
            placeholder="Contoh: 2000000"
          />
        </div>
      </div>
    </div>
  );
}
