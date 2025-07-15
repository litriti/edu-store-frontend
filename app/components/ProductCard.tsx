"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Eye, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "../lib/types";
import { useFavorites } from "../lib/store";
import { useToast } from "@/hooks/use-toast";
import { useViewHistory } from "../lib/store";

interface ProductCardProps {
  product: Product;
  onViewDetails: () => void;
}

export default function ProductCard({
  product,
  onViewDetails,
}: ProductCardProps) {
  const { t } = useTranslation();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [imageError, setImageError] = useState(false);
  const { addToViewHistory } = useViewHistory();
  const isFavorite = favorites.some((fav) => fav.id === product.id);
  const { toast } = useToast();

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
      toast({
        title: t("remove_fav_title"),
        description: t("remove_fav_desc", { name: product.name }),
      });
    } else {
      addToFavorites(product);
      toast({
        title: t("add_fav_title"),
        description: t("add_fav_desc", { name: product.name }),
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={imageError ? "/1.jpg" : product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 h-8 w-8 p-0 ${
            isFavorite
              ? "text-red-500 hover:text-red-600"
              : "text-gray-400 hover:text-red-500"
          }`}
          onClick={handleFavoriteToggle}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
        <Badge className="absolute top-2 left-2" variant="secondary">
          {product.category}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors truncate">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.rating}) • {product.students} {t("students")}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.level && <Badge variant="outline">{product.level}</Badge>}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => {
            addToViewHistory(product);
            onViewDetails();
          }}
          className="w-full flex items-center gap-2 bg-transparent"
          variant="outline"
        >
          <Eye className="h-4 w-4" />
          {t("view_details")}
        </Button>
      </CardFooter>
    </Card>
  );
}
