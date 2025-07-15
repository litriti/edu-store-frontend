"use client";

import { useState } from "react";
import { ArrowLeft, Clock, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useViewHistory } from "../lib/store";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import type { Product } from "../lib/types";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function HistoryPage() {
  const { viewHistory, clearViewHistory, addToViewHistory } = useViewHistory();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    addToViewHistory(product);
  };

  const handleClearHistory = () => {
    clearViewHistory();
    toast({
      title: "History cleared",
      description: "Your view history has been cleared successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Products
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-900">
                  View History
                </h1>
              </div>
            </div>
            {viewHistory.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearHistory}
                className="flex items-center gap-2 bg-transparent"
              >
                <Trash2 className="h-4 w-4" />
                Clear History
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Eye className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No history yet
            </h3>
            <p className="text-gray-600 mb-6">
              Products you view will appear here for easy access!
            </p>
            <Link href="/">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                You have viewed {viewHistory.length} product
                {viewHistory.length !== 1 ? "s" : ""} recently
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {viewHistory.map((product, index) => (
                <div key={`${product.id}-${index}`} className="relative">
                  <ProductCard
                    product={product}
                    onViewDetails={() => handleViewDetails(product)}
                  />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </>
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
