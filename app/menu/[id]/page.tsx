import { notFound } from "next/navigation"
import Image from "next/image"
import { Clock, Flame, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MobileContainer } from "@/components/mobile-container"
import { BottomNav } from "@/components/bottom-nav"
import { SimilarItems } from "@/components/similar-items"
import { getMenuItemById, getSimilarItems } from "@/lib/data"

interface MenuDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function MenuDetailPage({ params }: MenuDetailPageProps) {
  const { id } = await params
  const item = getMenuItemById(id)

  if (!item) {
    notFound()
  }

  const similarItems = getSimilarItems(item, 4)

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
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              <span>{item.prepTime} min</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <Flame className="w-4 h-4" />
              <span>{item.calories} cal</span>
            </div>
            {item.isPopular && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">Popular</span>
            )}
          </div>

          <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{item.description}</p>

          {/* Ingredients */}
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

          {/* Add to Order Button */}
          <button className="w-full mt-6 py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors active:scale-[0.98]">
            Add to Order
          </button>
        </div>

        {/* Similar Items */}
        <SimilarItems items={similarItems} />
      </div>
      <BottomNav />
    </MobileContainer>
  )
}
