"use client";

import { useState, useEffect } from "react";
import { Search, Sparkles, Heart, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import type { Product } from "./lib/types";
import { useFavorites } from "./lib/store";
import Link from "next/link";
import Loading from "./loading";
import { Toaster } from "@/components/ui/toaster";
import { useViewHistory } from "./lib/store";
import Image from "next/image";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { favorites } = useFavorites();
  const { toast } = useToast();
  const { viewHistory, addToViewHistory } = useViewHistory();

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products when search term or price filter changes
  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, priceFilter]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price
    if (priceFilter !== "all") {
      filtered = filtered.filter((product) => {
        switch (priceFilter) {
          case "under-500":
            return product.price < 500000;
          case "500-1000":
            return product.price >= 500000 && product.price <= 1000000;
          case "over-1000":
            return product.price > 1000000;
          default:
            return true;
        }
      });
    }

    setFilteredProducts(filtered);
  };

  const handleAISuggestions = async () => {
    setIsSuggesting(true);
    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          favoriteIds: favorites.map((item) => item.id), // 👈 gửi danh sách favorite
        }),
      });

      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
      toast({
        title: "AI Suggestions Generated!",
        description:
          "Here are some courses tailored for you based on your favorites.",
      });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to get AI suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    // Add to view history
    const handleViewDetails = (product: Product) => {
      setSelectedProduct(product);
      addToViewHistory(product);
    };
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo + Brand name */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png" // Đảm bảo đã có file tại public/logo.png
                alt="Cabi Edu Logo"
                width={40}
                height={40}
                className="rounded-full" // Có thể đổi thành rounded-full nếu là logo tròn
              />
              <span className="text-2xl font-bold text-gray-900">Cabi Edu</span>
            </Link>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              <Link href="/history">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Clock className="h-4 w-4" />
                  History ({viewHistory.length})
                </Button>
              </Link>
              <Link href="/favorites">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Heart className="h-4 w-4" />
                  Favorites ({favorites.length})
                </Button>
              </Link>
              <Link href="/chat">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <MessageCircle className="h-4 w-4" />
                  AI Chat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses, books, documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-500">Under 500K VND</SelectItem>
                <SelectItem value="500-1000">500K - 1M VND</SelectItem>
                <SelectItem value="over-1000">Over 1M VND</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* AI Suggestions Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleAISuggestions}
              disabled={isSuggesting}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isSuggesting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isSuggesting ? "Loading..." : "Get AI Suggestions"}
            </Button>
          </div>
        </div>

        {/* AI Suggestions Section */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                AI Recommended for You
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 truncate">
              {suggestions.map((product) => (
                <div key={`suggestion-${product.id}`} className="relative">
                  <Badge className="absolute -top-2 -right-2 z-10 bg-purple-600">
                    AI Pick
                  </Badge>
                  <ProductCard
                    product={product}
                    onViewDetails={() => setSelectedProduct(product)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} educational
            products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto " />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={() => handleViewDetails(product)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <Toaster />
    </div>
  );
}
