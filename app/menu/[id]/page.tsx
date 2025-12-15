"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, use } from "react"
import { MobileContainer } from "@/components/mobile-container"
import { BottomNav } from "@/components/bottom-nav"
import { SimilarItems } from "@/components/similar-items"
import { FeedbackModal } from "@/components/feedback-modal"
import type { MenuItem } from "@/lib/data"
import { fetchItemById, fetchItems, transformItem } from "@/lib/api"

interface MenuDetailPageProps {
  params: Promise<{ id: string }>
}

export default function MenuDetailPage({ params }: MenuDetailPageProps) {
  const { id } = use(params)
  const [item, setItem] = useState<MenuItem | null>(null)
  const [similarItems, setSimilarItems] = useState<MenuItem[]>([])
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadItem() {
      try {
        const fetchedItem = await fetchItemById(id)
        if (!fetchedItem) {
          notFound()
          return
        }

        const transformedItem = {
          ...transformItem(fetchedItem),
          isPopular: fetchedItem.special, // Map special to isPopular
        }
        setItem(transformedItem)

        // Fetch similar items (same category)
        const categoryId = fetchedItem.categoryId || fetchedItem.category?.id
        if (categoryId) {
          const allItems = await fetchItems(categoryId)
          const similar = allItems
            .filter((i) => i.id !== id && i.isAvailable)
            .slice(0, 4)
            .map((i) => ({
              ...transformItem(i),
              isPopular: i.special,
            }))
          setSimilarItems(similar)
        }
      } catch (error) {
        console.error("Failed to load item:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadItem()
  }, [id])

  if (loading) {
    return (
      <MobileContainer>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
        <BottomNav />
      </MobileContainer>
    )
  }

  if (!item) {
    notFound()
  }

  return (
    <MobileContainer>
      <div className="flex-1 overflow-y-auto">
        {/* Hero Image Section */}
        <div className="relative">
          <div className="aspect-[4/3] relative">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          </div>
          <Link
            href="/"
            className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
        </div>

        {/* Content */}
        <div className="px-4 py-5">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold text-foreground">{item.name}</h1>
            <span className="text-2xl font-bold text-blue-500">${item.price.toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-4 mt-3">
            {item.isPopular && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">Popular</span>
            )}
          </div>

          <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{item.description}</p>

          {/* Ingredients */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="mt-6">
              <h2 className="text-base font-semibold text-foreground mb-3">Ingredients</h2>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ingredient, index) => (
                  <span key={index} className="px-3 py-1.5 bg-muted rounded-full text-xs text-foreground">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          {item.comments && item.comments.length > 0 && (
            <div className="mt-6">
              <h2 className="text-base font-semibold text-foreground mb-3">Comments</h2>
              <div className="space-y-3">
                {item.comments.map((comment, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg text-sm text-foreground">
                    {comment}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="w-full mt-6 py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors active:scale-[0.98]"
          >
            Leave Feedback
          </button>
        </div>

        {/* Similar Items */}
        <SimilarItems items={similarItems} />
      </div>

      <BottomNav />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        itemId={item.id}
        itemName={item.name}
        onCommentAdded={async () => {
          // Reload item to get updated comments
          const updatedItem = await fetchItemById(id)
          if (updatedItem) {
            const transformedItem = {
              ...transformItem(updatedItem),
              isPopular: updatedItem.special,
            }
            setItem(transformedItem)
          }
        }}
      />
    </MobileContainer>
  )
}
