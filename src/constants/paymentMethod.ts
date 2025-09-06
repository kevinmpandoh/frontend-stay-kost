export const PAYMENT_METHOD = [
  {
    category: "Bank Transfer",
    methods: [
      {
        name: "BNI Virtual Account",
        logo: "/logos/bank/bni.png",
        value: "bni",
      },
      {
        name: "BCA Virtual Account",
        logo: "/logos/bank/bca.png",
        value: "bca",
      },
      {
        name: "BRI Virtual Account",
        logo: "/logos/bank/bri.webp",
        value: "bri",
      },
      {
        name: "Mandiri Virtual Account",
        logo: "/logos/bank/mandiri.svg",
        value: "mandiri",
      },
    ],
  },
  {
    category: "E-Wallet",
    methods: [
      { name: "QRIS", logo: "/logos/ewallet/qris.svg", value: "qris" },
      { name: "Gopay", logo: "/logos/ewallet/gopay.svg", value: "gopay" },
      { name: "DANA", logo: "/logos/ewallet/dana.svg", value: "dana" },
    ],
  },
];
