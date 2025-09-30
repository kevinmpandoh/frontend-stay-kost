"use client";

// import { Facebook, Twitter, Whatsapp, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
}

export function ShareModal({ open, onClose, url }: ShareModalProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link berhasil disalin!");
    } catch {
      toast.error("Gagal menyalin link");
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Bagikan halaman ini</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-4 my-4">
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white p-3 rounded-full"
          >
            {/* <Facebook className="w-5 h-5" /> */}
            FB
          </a>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white p-3 rounded-full"
          >
            {/* <Twitter className="w-5 h-5" /> */}
            Twiter
          </a>
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-3 rounded-full"
          >
            WA
            {/* <Whatsapp className="w-5 h-5" /> */}
          </a>
          <a
            href={shareLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-400 text-white p-3 rounded-full"
          >
            TELEGRAM
            {/* <Send className="w-5 h-5" /> */}
          </a>
        </div>

        <div className="text-sm text-center text-muted-foreground mb-2">
          atau bagikan dengan link
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={url}
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
          <Button onClick={handleCopy}>Copy</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
