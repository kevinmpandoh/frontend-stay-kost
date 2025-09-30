"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface ModalRatingProps {
  open: boolean;
  onClose: () => void;
  selectedRatings: number[];
  onChange: (ratings: number[]) => void;
}

const ratingOptions = [5, 4, 3, 2, 1];

const ModalRating = ({
  open,
  onClose,
  selectedRatings,
  onChange,
}: ModalRatingProps) => {
  const [tempRatings, setTempRatings] = useState<number[]>(selectedRatings);

  const toggleRating = (value: number) => {
    if (tempRatings.includes(value)) {
      setTempRatings(tempRatings.filter((r) => r !== value));
    } else {
      setTempRatings([...tempRatings, value]);
    }
  };

  const handleSave = () => {
    onChange(tempRatings);
    onClose();
  };

  const handleReset = () => {
    setTempRatings([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rating Kost</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-2">
          {ratingOptions.map((rating) => (
            <label key={rating} className="flex items-center gap-2">
              <Checkbox
                checked={tempRatings.includes(rating)}
                onCheckedChange={() => toggleRating(rating)}
              />
              <span>{rating} Bintang</span>
            </label>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="ghost" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSave}>Terapkan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalRating;
