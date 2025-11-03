import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Meh } from "lucide-react";
import type { Review, ReviewSentiment } from "@/types";

interface ReviewCardProps {
  review: Review;
}

const sentimentConfig: Record<
  ReviewSentiment,
  {
    icon: typeof ThumbsUp;
    label: string;
    variant: "success" | "warning" | "destructive";
    color: string;
  }
> = {
  positive: {
    icon: ThumbsUp,
    label: "Positivo",
    variant: "success",
    color: "text-green-600",
  },
  neutral: {
    icon: Meh,
    label: "Neutrale",
    variant: "warning",
    color: "text-yellow-600",
  },
  negative: {
    icon: ThumbsDown,
    label: "Negativo",
    variant: "destructive",
    color: "text-red-600",
  },
};

export function ReviewCard({ review }: ReviewCardProps) {
  const SentimentIcon = sentimentConfig[review.sentiment].icon;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {review.authorAvatar ? (
              <img
                src={review.authorAvatar}
                alt={review.author}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {review.author[0].toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-medium">{review.author}</p>
              <div className="flex items-center gap-2">
                {renderStars(review.rating)}
                <span className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString("it-IT")}
                </span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="gap-1">
            <SentimentIcon className="h-3 w-3" />
            {sentimentConfig[review.sentiment].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{review.content}</p>

        {review.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {review.categories.map((category, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        )}

        {review.response ? (
          <div className="rounded-lg bg-muted p-3">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <MessageSquare className="h-4 w-4" />
              <span>Risposta ({review.response.author.name})</span>
            </div>
            <p className="text-sm text-muted-foreground">{review.response.content}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {new Date(review.response.createdAt).toLocaleDateString("it-IT")}
            </p>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Rispondi
            </Button>
            <Button variant="ghost" size="sm">
              <Star className="mr-2 h-4 w-4" />
              Suggerimento AI
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Fonte: {review.source.charAt(0).toUpperCase() + review.source.slice(1)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
