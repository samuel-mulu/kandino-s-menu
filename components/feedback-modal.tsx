"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { StarRating } from "./star-rating"

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  itemName: string
}

export function FeedbackModal({ isOpen, onClose, itemName }: FeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = () => {
    // Here you would typically send the feedback to your backend
    setSubmitted(true)
    setTimeout(() => {
      onClose()
      setRating(0)
      setComment("")
      setSubmitted(false)
    }, 1500)
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
            <p className="text-muted-foreground text-sm mb-6">How was your {itemName}?</p>

            {/* Rating Stars */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-3">Your Rating</label>
              <div className="flex justify-center">
                <StarRating rating={rating} onRatingChange={setRating} size="lg" />
              </div>
            </div>

            {/* Comment Textarea */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">Your Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience..."
                className="w-full h-28 px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="w-full py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Feedback
            </button>
          </>
        )}
      </div>
    </div>
  )
}
