import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export const LoadingModal = ({
  open,
  message,
}: {
  open: boolean;
  message?: string;
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="flex flex-col items-center justify-center gap-4 py-10">
        <DialogTitle className="sr-only">Loading...</DialogTitle>
        <Loader2 className="text-primary h-10 w-10 animate-spin" />
        <p className="text-center text-lg text-gray-600">
          {message || "Memproses permintaan..."}
        </p>
      </DialogContent>
    </Dialog>
  );
};
