export const PAYMENT_GUIDES: Record<
  string,
  {
    title: string;
    steps: string[];
  }[]
> = {
  bni: [
    {
      title: "ATM BNI",
      steps: [
        "Masukkan kartu ATM dan PIN Anda",
        "Pilih Menu ‘Transfer’",
        "Pilih ke Rekening Virtual Account",
        "Masukkan nomor VA yang ditampilkan",
        "Konfirmasi dan selesaikan transaksi",
      ],
    },
    {
      title: "Internet Banking BNI",
      steps: [
        "Login ke Internet Banking BNI",
        "Pilih menu Transfer > Virtual Account Billing",
        "Masukkan nomor VA",
        "Ikuti instruksi untuk menyelesaikan pembayaran",
      ],
    },
  ],
  mandiri: [
    {
      title: "ATM Mandiri",
      steps: [
        "Masukkan kartu ATM dan PIN Anda",
        "Pilih Menu ‘Bayar/Beli’ > Multi Payment",
        "Masukkan Kode Perusahaan dan Bill Key",
        "Konfirmasi dan selesaikan pembayaran",
      ],
    },
  ],
  gopay: [
    {
      title: "Aplikasi Gojek",
      steps: [
        "Buka aplikasi Gojek",
        "Pilih menu Bayar",
        "Scan QR code yang ditampilkan",
        "Konfirmasi pembayaran dan selesaikan",
      ],
    },
  ],
};
