import { MobileContainer } from "@/components/mobile-container"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <MobileContainer>
      <Header title="Contact Us" showBack />
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <p className="text-sm text-muted-foreground mb-6">
          Have a special request or feedback? We'd love to hear from you.
        </p>
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-muted rounded-xl border-none outline-none text-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Room Number</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-muted rounded-xl border-none outline-none text-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="e.g. 204"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Message</label>
            <textarea
              className="w-full px-4 py-3 bg-muted rounded-xl border-none outline-none text-sm focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
              rows={4}
              placeholder="Your message or special request..."
            />
          </div>
          <Button className="w-full py-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl">
            Send Message
          </Button>
        </form>
      </div>
      <BottomNav />
    </MobileContainer>
  )
}
