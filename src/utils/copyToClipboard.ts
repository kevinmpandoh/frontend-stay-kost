import { toast } from "sonner";

export function copyToClipboard(text: string | null) {
  if (!text) return;
  if (!navigator.clipboard) {
    toast.error("Clipboard API tidak didukung di browser ini", {
      position: "top-center",
    });
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Berhasil disalin ke Clipboard", {
        position: "top-center",
      });
    })
    .catch(() => {
      toast.error("Gagal menyalin", {
        position: "top-center",
      });
    });
}
