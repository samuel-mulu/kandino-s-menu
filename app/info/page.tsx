import { MobileContainer } from "@/components/mobile-container"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Clock, MapPin, Phone, Wifi, Car, CreditCard } from "lucide-react"

const infoItems = [
  { icon: Clock, label: "Hours", value: "6:00 AM - 11:00 PM" },
  { icon: MapPin, label: "Location", value: "Lobby Level, Main Building" },
  { icon: Phone, label: "Room Service", value: "Dial 0 from your room" },
  { icon: Wifi, label: "WiFi", value: "Complimentary for guests" },
  { icon: Car, label: "Parking", value: "Valet available" },
  { icon: CreditCard, label: "Payment", value: "All major cards accepted" },
]

export default function InfoPage() {
  return (
    <MobileContainer>
      <Header title="Information" showBack />
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-3">
          {infoItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-muted rounded-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <item.icon className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium text-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </MobileContainer>
  )
}
