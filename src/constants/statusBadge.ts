export const statusLabelMap: Record<string, string> = {
  pending: "Menunggu Persetujuan",
  expired: "Kedaluwarsa",
  approved: "Disetujui",
  rejected: "Ditolak",
  waiting_for_payment: "Menunggu Pembayaran",
  waiting_for_checkin: "Menunggu Check-In",
  active: "Sedang Dihuni",
  waiting_for_checkout: "Menunggu Check-Out",
  completed: "Selesai",
};

export const statusColorMap: Record<string, { text: string; bg: string }> = {
  pending: { text: "text-[#b45309]", bg: "bg-[#fef3c7]" },
  waiting_for_payment: { text: "text-[#b45309]", bg: "bg-[#fef3c7]" },
  approved: { text: "text-[#2563eb]", bg: "bg-[#dbeafe]" },
  waiting_for_checkin: { text: "text-[#7c3aed]", bg: "bg-[#ede9fe]" },
  active: { text: "text-[#16a34a]", bg: "bg-[#dcfce7]" },
  completed: { text: "text-[#374151]", bg: "bg-[#f3f4f6]" },
  expired: { text: "text-gray-600", bg: "bg-gray-200" },
  rejected: { text: "text-red-700", bg: "bg-red-100" },
};
