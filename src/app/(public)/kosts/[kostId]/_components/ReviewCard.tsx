import { Review } from "@/types/Review.type";

import { Star, StarHalf, StarOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, isValid, parseISO } from "date-fns";
import { id } from "date-fns/locale";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div key={review.id} className="space-y-3 border-b px-6 pb-6">
      <div className="flex items-start gap-4">
        <Avatar>
          {review.avatar ? (
            <AvatarImage src={review.avatar} />
          ) : (
            <AvatarFallback>
              {review.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <p className="font-medium">{review.name}</p>
            <StarRating rating={review.rating} />
          </div>
          <p className="text-muted-foreground text-sm">
            {review.createdAt && isValid(new Date(review.createdAt))
              ? format(parseISO(review.createdAt), "dd MMMM yyyy", {
                  locale: id,
                })
              : "-"}
          </p>

          <p className="text-md mt-1 text-slate-600">{review.message}</p>

          {review.reply && review.reply.message && (
            <div className="mt-3 rounded-md border-l-4 border-gray-300 bg-gray-50 p-3 text-sm">
              <p className="text-md font-semibold text-gray-700">
                Balasan Pemilik Kost:
              </p>
              <p className="text-md mt-1 text-gray-600">
                {review.reply.message}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {review.reply.createdAt &&
                isValid(new Date(review.reply.createdAt))
                  ? format(parseISO(review.reply.createdAt), "dd MMMM yyyy", {
                      locale: id,
                    })
                  : "-"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="text-primary-500 flex items-center">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars)
          return <Star key={i} className="h-4 w-4 fill-current" />;
        if (i === fullStars && hasHalf)
          return <StarHalf key={i} className="h-4 w-4" />;
        return <Star key={i} className="text-muted-foreground h-4 w-4" />;
      })}
    </div>
  );
}
