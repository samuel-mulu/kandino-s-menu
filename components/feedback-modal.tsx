"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { addCommentToItem } from "@/lib/api"

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  itemId: string
  itemName: string
  onCommentAdded?: () => void
}

export function FeedbackModal({ isOpen, onClose, itemId, itemName, onCommentAdded }: FeedbackModalProps) {
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async () => {
    if (!comment.trim()) {
      setError("Please enter a comment")
      return
    }

    setLoading(true)
    setError(null)

    try {
      await addCommentToItem(itemId, comment)
      setSubmitted(true)
      
      // Call callback to refresh item data
      if (onCommentAdded) {
        onCommentAdded()
      }

      setTimeout(() => {
        onClose()
        setComment("")
        setSubmitted(false)
        setError(null)
      }, 1500)
    } catch (err) {
      console.error("Failed to add comment:", err)
      setError("Failed to submit comment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-background rounded-2xl w-[90%] max-w-md p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Thank you!</h3>
            <p className="text-muted-foreground text-sm mt-1">Your feedback has been submitted.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-foreground mb-1">Leave Feedback</h2>
            <p className="text-muted-foreground text-sm mb-6">Share your thoughts about {itemName}</p>

            {/* Comment Textarea */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">Your Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience..."
                className="w-full h-28 px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!comment.trim() || loading}
              className="w-full py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Comment"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
