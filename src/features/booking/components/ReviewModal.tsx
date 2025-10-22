"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Star } from "lucide-react";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
}

export const ReviewModal = ({ open, onClose, onSubmit }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating > 0 && review.trim()) {
      onSubmit(rating, review);
      onClose();
      setRating(0);
      setReview("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Beri Review Kost</DialogTitle>
        </DialogHeader>
        <div className="mb-4 flex w-full justify-center space-x-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              onClick={() => handleRatingClick(value)}
              className={`h-10 w-10 cursor-pointer ${
                value <= rating ? "text-primary-500" : "text-gray-300"
              }`}
              fill={value <= rating ? "currentColor" : "none"}
            />
          ))}
        </div>
        <Textarea
          placeholder="Tulis ulasan kamu di sini..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="mb-4"
        />
        <Button
          onClick={handleSubmit}
          disabled={rating === 0 || review.trim() === ""}
        >
          Kirim Review
        </Button>
      </DialogContent>
    </Dialog>
  );
};
