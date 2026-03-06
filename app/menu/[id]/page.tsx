"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, MessageSquare, Send, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, use } from "react"
import { MobileContainer } from "@/components/mobile-container"
import { BottomNav } from "@/components/bottom-nav"
import { SimilarItems } from "@/components/similar-items"
import type { MenuItem } from "@/lib/data"
import { fetchItemById, fetchItems, transformItem, addCommentToItem } from "@/lib/api"
import { SplashScreen } from "@/components/splash-screen"
import { toast } from "sonner"

interface MenuDetailPageProps {
  params: Promise<{ id: string }>
}

export default function MenuDetailPage({ params }: MenuDetailPageProps) {
  const { id } = use(params)
  const [item, setItem] = useState<MenuItem | null>(null)
  const [similarItems, setSimilarItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const updatedItem = await addCommentToItem(id, newComment)
      setItem({
        ...transformItem(updatedItem),
        isPopular: updatedItem.special
      })
      setNewComment("")
      toast.success("Thank you for your feedback!")
    } catch (error) {
      console.error("Failed to add comment:", error)
      toast.error("Failed to post comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <SplashScreen />
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
            <Image 
              src={item.image || "/image.jpg"} 
              alt={item.name} 
              fill 
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.srcset = "";
                target.src = "/image.jpg";
              }}
            />
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
            <span className="text-2xl font-bold text-blue-500">{Math.round(item.price)} ብር</span>
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

          {/* Feedback/Comments Section */}
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-bold">Feedback</h2>
            </div>

            {/* Existing Comments */}
            <div className="space-y-4 mb-8">
              {item.comments && item.comments.length > 0 ? (
                item.comments.map((comment, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-2xl border border-border/50 text-sm italic text-foreground/80">
                    "{comment}"
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm bg-muted/20 rounded-2xl border border-dashed border-border">
                  No feedback yet. Be the first to tell us what you think!
                </div>
              )}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this dish..."
                className="w-full min-h-[120px] p-4 bg-muted/40 rounded-2xl border border-border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition-all resize-none"
                disabled={isSubmitting}
                required
              />
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className="absolute bottom-3 right-3 p-3 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 disabled:opacity-50 transition-all active:scale-95"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>

        {/* Similar Items */}
        <SimilarItems items={similarItems} />
      </div>

      <BottomNav />
    </MobileContainer>
  )
}
