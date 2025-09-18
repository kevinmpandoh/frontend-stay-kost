"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Facebook, Twitter, Send, MessageCircle } from "lucide-react"; // pakai icon dari lucide

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
      url,
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

        <div className="my-4 flex justify-center gap-4">
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-blue-600 p-3 text-white hover:opacity-90"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-black p-3 text-white hover:opacity-90"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green-500 p-3 text-white hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <a
            href={shareLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-sky-400 p-3 text-white hover:opacity-90"
          >
            <Send className="h-5 w-5" />
          </a>
        </div>

        <div className="text-muted-foreground mb-2 text-center text-sm">
          atau bagikan dengan link
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={url}
            className="flex-1 rounded border px-3 py-2 text-sm"
          />
          <Button onClick={handleCopy}>Copy</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
