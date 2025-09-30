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
  bca: [
    {
      title: "ATM BCA",
      steps: [
        "Masukkan kartu ATM dan PIN Anda",
        "Pilih Menu ‘Transaksi Lain’ > Transfer > BCA Virtual Account",
        "Masukkan nomor VA",
        "Konfirmasi dan selesaikan transaksi",
      ],
    },
    {
      title: "KlikBCA / m-BCA",
      steps: [
        "Login ke KlikBCA atau m-BCA",
        "Pilih menu Transfer > BCA Virtual Account",
        "Masukkan nomor VA",
        "Ikuti instruksi untuk menyelesaikan pembayaran",
      ],
    },
  ],
  bri: [
    {
      title: "ATM BRI",
      steps: [
        "Masukkan kartu ATM dan PIN Anda",
        "Pilih Menu ‘Pembayaran’ > ‘BRIVA’",
        "Masukkan nomor VA",
        "Konfirmasi dan selesaikan transaksi",
      ],
    },
    {
      title: "Internet Banking BRI",
      steps: [
        "Login ke Internet Banking BRI",
        "Pilih menu Pembayaran > BRIVA",
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
    {
      title: "Internet Banking Mandiri",
      steps: [
        "Login ke Internet Banking Mandiri",
        "Pilih menu Bayar > Multi Payment",
        "Masukkan Kode Perusahaan dan Bill Key",
        "Konfirmasi dan selesaikan pembayaran",
      ],
    },
  ],
  qris: [
    {
      title: "QRIS / Scan QR",
      steps: [
        "Buka aplikasi e-wallet Anda (OVO, Dana, ShopeePay, dll.)",
        "Pilih menu Scan QR",
        "Scan QR code yang ditampilkan",
        "Masukkan nominal jika diperlukan, lalu konfirmasi pembayaran",
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
