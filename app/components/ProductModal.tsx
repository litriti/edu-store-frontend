"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Star, Clock, Users, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "../lib/types";
import { useFavorites } from "../lib/store";
import { useTranslation } from "react-i18next";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const { t } = useTranslation();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [imageError, setImageError] = useState(false);

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl font-bold pr-8">{product.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteToggle}
              className={`${
                isFavorite
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <Image
                src={
                  imageError
                    ? "/placeholder.svg?height=400&width=600"
                    : product.image
                }
                alt={product.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">{t("students_label")}</p>
                  <p className="font-semibold">{product.students}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">{t("duration_label")}</p>
                  <p className="font-semibold">{product.duration}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{product.rating}</span>
                <span className="text-gray-600">
                  ({product.students} {t("product_reviews")})
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Badge>{product.category}</Badge>
                {product.level && (
                  <Badge variant="outline">{t(`level_${product.level}`)}</Badge>
                )}
              </div>
            </div>

            <Separator />

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">{t("tab_overview")}</TabsTrigger>
                <TabsTrigger value="curriculum">
                  {t("tab_curriculum")}
                </TabsTrigger>
                <TabsTrigger value="reviews">{t("tab_reviews")}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    {t("product_description")}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {t("product.longDescription ")}
                    {product.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t("product_learn")}</h4>
                  <ul className="space-y-2">
                    {product.learningOutcomes?.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">
                    {t("product_curriculum")}
                  </h4>
                  <div className="space-y-3">
                    {product.curriculum?.map((section, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{section.title}</span>
                          <Badge variant="secondary" className="ml-auto">
                            {t("product_lessons", {
                              count: section.lessons,
                            })}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {section.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">{t("product_reviews")}</h4>
                  <div className="space-y-4">
                    {product.reviews?.map((review, index) => (
                      <div
                        key={index}
                        className="border-b pb-4 last:border-b-0"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">{review.author}</span>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3">
              <Button className="flex-1" size="lg">
                {t("enroll_now")}
              </Button>
              <Button variant="outline" size="lg">
                {t("add_to_cart")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
