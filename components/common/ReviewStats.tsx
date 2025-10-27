// src/components/agent/ReviewStats.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewStatsInt } from "@/hooks/agent/useAgentReviews";
import { Star, MessageCircle, TrendingUp, Users } from "lucide-react";

interface ReviewStatsProps {
  stats: ReviewStatsInt;
  responseRate: number;
}

export function ReviewStats({ stats, responseRate }: ReviewStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Average Rating */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Average Rating
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.averageRating.toFixed(1)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(stats.averageRating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
              <Star className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Reviews */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalReviews}
              </p>
              <p className="text-sm text-gray-500 mt-1">All time</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <MessageCircle className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Response Rate */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {responseRate}%
              </p>
              <p className="text-sm text-gray-500 mt-1">Reviews with replies</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating Distribution */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Rating Breakdown
              </p>
              <div className="space-y-1 mt-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const distribution = stats.ratingDistribution.find(
                    (d) => d.rating === rating
                  );
                  const percentage = distribution?.percentage || 0;

                  return (
                    <div
                      key={rating}
                      className="flex items-center gap-2 text-xs"
                    >
                      <span className="w-4 text-gray-600">{rating}</span>
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-amber-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-gray-600 text-right">
                        {distribution?.count || 0}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
