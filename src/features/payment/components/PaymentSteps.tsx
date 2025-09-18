import { useState } from "react";
import { PAYMENT_GUIDES } from "@/constants/PaymentGuide";
import { ChevronDown, ChevronUp } from "lucide-react";

export const PaymentSteps = ({ method }: { method: string }) => {
  const guides = PAYMENT_GUIDES[method];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!guides) return null;

  return (
    <div className="mt-6">
      <h2 className="font-semibold text-lg mb-4">Cara Pembayaran</h2>
      <div className="space-y-4">
        {guides.map((guide, index) => (
          <div key={index} className="border-b rounded-md">
            <button
              className="w-full px-4 py-3 flex justify-between items-center font-medium text-left"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span>{guide.title}</span>
              <span>
                {openIndex === index ? <ChevronDown /> : <ChevronUp />}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-base text-gray-700">
                <ol className="list-decimal pl-5 space-y-1">
                  {guide.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
