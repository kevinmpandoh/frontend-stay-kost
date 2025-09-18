export const PAYMENT_METHOD = [
  {
    category: "Bank Transfer",
    methods: [
      {
        name: "BNI Virtual Account",
        logo: "/logos/bank/bni.png",
        provider: "midtrans",
        method: "bank_transfer",
        channel: "bni",
      },
      {
        name: "BCA Virtual Account",
        logo: "/logos/bank/bca.png",
        provider: "midtrans",
        method: "bank_transfer",
        channel: "bca",
      },
      {
        name: "BRI Virtual Account",
        logo: "/logos/bank/bri.webp",
        provider: "midtrans",
        method: "bank_transfer",
        channel: "bri",
      },
      {
        name: "Mandiri Virtual Account",
        logo: "/logos/bank/mandiri.svg",
        provider: "midtrans",
        method: "echannel",
        channel: "mandiri",
      },
      {
        name: "CIMB Virtual Account",
        logo: "/logos/bank/cimb.svg",
        provider: "midtrans",
        method: "bank_transfer",
        channel: "cimb",
      },
    ],
  },
  {
    category: "E-Wallet",
    methods: [
      {
        name: "QRIS",
        logo: "/logos/ewallet/qris.svg",
        provider: "midtrans",
        method: "ewallet",
        channel: "qris",
      },
      {
        name: "Gopay",
        logo: "/logos/ewallet/gopay.svg",
        provider: "midtrans",
        method: "ewallet",
        channel: "gopay",
      },
      {
        name: "DANA",
        logo: "/logos/ewallet/dana.svg",
        provider: "midtrans",
        method: "ewallet",
        channel: "dana",
      },
    ],
  },
];
