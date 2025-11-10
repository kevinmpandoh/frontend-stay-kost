// utils/getNotificationLink.ts
export function getNotificationLink(notif: any) {
  if (!notif.type) return null;

  switch (notif.type) {
    case "booking":
      if (notif.role === "owner")
        return `/dashboard/owner/pengajuan-sewa/${notif.metadata?.bookingId}`;
      if (notif.role === "tenant")
        return `/user/pengajuan-sewa?${notif.metadata?.bookingId}`;
      break;

    case "payment":
      if (notif.role === "tenant")
        return `/user/riwayat-transaksi?${notif.metadata?.bookingId}`;
    // return `/payments/${notif.metadata?.invoiceId}`;

    // case "subscription":
    //   return `/dashboard/owner/subscriptions/${notif.metadata?.subscriptionId}`;

    // case "payout":
    //   return `/owner/payouts/${notif.metadata?.payoutId}`;

    // case "chat":
    //   return `/chats/${notif.metadata?.chatId}`;

    default:
      return null; // system notif → tidak clickable
  }
}
