// src/components/agent/ReviewCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Calendar, User, MessageSquare, ThumbsUp } from "lucide-react";
import { Review } from "@/interfaces";

interface ReviewCardProps {
  review: Review;
  onReply?: (reviewId: number) => void;
}

export function ReviewCard({ review, onReply }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name?: string) => {
    if (!name) return "C";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600 bg-green-50 border-green-200";
    if (rating >= 3) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Customer Info & Rating */}
          <div className="flex items-start gap-4 lg:w-48 flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
              {getInitials(review.customer?.user?.username)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {review.customer?.user?.username || "Anonymous Customer"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full border ${getRatingColor(
                    review.rating
                  )}`}
                >
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-xs font-medium">{review.rating}.0</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span className="text-xs">
                    {formatDate(review.created_at)}
                  </span>
                </div>
              </div>
              {review.service && (
                <Badge variant="secondary" className="mt-2 text-xs">
                  {review.service.title}
                </Badge>
              )}
            </div>
          </div>

          {/* Review Content */}
          <div className="flex-1 space-y-4">
            {review.title && (
              <h4 className="font-semibold text-gray-900 text-lg">
                {review.title}
              </h4>
            )}

            <div className="flex items-start gap-1">
              <div className="flex items-center gap-1 flex-shrink-0 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              {review.comment ? (
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              ) : (
                <p className="text-gray-500 italic">No comment provided</p>
              )}
            </div>

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  Helpful
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <MessageSquare className="h-4 w-4" />
                  Reply
                </Button>
              </div>

              {/* Service Info */}
              {review.service && (
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {review.service.title}
                  </p>
                  <p className="text-xs text-gray-500">Service</p>
                </div>
              )}
            </div>

            {/* Reply Section (would be implemented later) */}
            {/* {review.reply && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                    Y
                  </div>
                  <span className="text-sm font-medium text-blue-900">Your Response</span>
                  <span className="text-xs text-blue-700">{formatDate(review.updated_at)}</span>
                </div>
                <p className="text-sm text-blue-800">{review.reply}</p>
              </div>
            )} */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
