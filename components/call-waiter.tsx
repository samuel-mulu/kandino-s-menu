"use client"

import { useState, useEffect, useMemo } from "react"
import { Bell, X, CheckCircle2, AlertCircle, Search, Plus, Minus, UtensilsCrossed } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { callWaiter, fetchItems, transformItem } from "@/lib/api"
import type { MenuItem } from "@/lib/data"
import { cn } from "@/lib/utils"

export function CallWaiter() {
  const searchParams = useSearchParams()
  const tableFromUrl = searchParams.get("table")
  
  const [isOpen, setIsOpen] = useState(false)
  const [tableNumber, setTableNumber] = useState(tableFromUrl || "")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading-items">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Food Selection State
  const [showFoodMenu, setShowFoodMenu] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set())

  // Update table number if URL param changes
  useEffect(() => {
    if (tableFromUrl) {
      setTableNumber(tableFromUrl)
    }
  }, [tableFromUrl])

  // Load menu items when modal is opened
  useEffect(() => {
    if (isOpen && menuItems.length === 0) {
      const loadItems = async () => {
        try {
          const fetched = await fetchItems()
          const transformed = fetched.map(transformItem)
          setMenuItems(transformed)
        } catch (error) {
          console.error("Failed to load items in CallWaiter:", error)
        }
      }
      loadItems()
    }
  }, [isOpen, menuItems.length])

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      item.isAvailable
    )
  }, [menuItems, searchQuery])

  const toggleItemSelection = (id: string) => {
    const newSelected = new Set(selectedItemIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedItemIds(newSelected)
  }

  const selectedItemsSummary = useMemo(() => {
    return menuItems
      .filter(item => selectedItemIds.has(item.id))
      .map(item => item.name)
  }, [menuItems, selectedItemIds])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tableNumber) return

    setLoading(true)
    setStatus("idle")
    setErrorMessage("")

    try {
      // Send selected items in metadata
      const metadata = selectedItemsSummary.length > 0 
        ? { items: selectedItemsSummary } 
        : undefined

      await callWaiter(parseInt(tableNumber as string), metadata)
      
      setStatus("success")
      setTimeout(() => {
        setIsOpen(false)
        setStatus("idle")
        setSelectedItemIds(new Set())
        setShowFoodMenu(false)
      }, 2000)
    } catch (err: any) {
      setStatus("error")
      setErrorMessage(err.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-all active:scale-95 z-40 group"
        aria-label="Call Waiter"
      >
        {/* Ringing Ripple Effect */}
        <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-25 group-hover:animate-none"></span>
        <span className="absolute inset-[-4px] rounded-full border-2 border-blue-400/30 animate-pulse"></span>
        
        <div className="relative z-10 animate-ring-vibrate">
          <Bell className="w-7 h-7 fill-current" />
        </div>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => !loading && setIsOpen(false)} 
          />
          
          <div className="relative bg-background rounded-2xl w-full max-w-md p-6 shadow-xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground z-10"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>

            {status === "success" ? (
              <div className="py-10 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Notification Sent!</h3>
                <p className="text-muted-foreground">The staff has been notified for Table {tableNumber}.</p>
              </div>
            ) : (
              <div className="flex flex-col h-full overflow-hidden">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-1">Call Waiter</h2>
                  <p className="text-sm text-muted-foreground">Notify staff at Table {tableNumber}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
                  <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
                    {/* Table Number Input */}
                    <div>
                      <label htmlFor="tableNumber" className="block text-sm font-medium mb-1.5 opacity-70">
                        Table Number
                      </label>
                      <input
                        id="tableNumber"
                        type="number"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="e.g. 5"
                        className="w-full h-12 px-4 bg-muted rounded-xl border-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold text-lg"
                        required
                        disabled={loading}
                      />
                    </div>

                    {/* Food Selection Toggle */}
                    <div className="pt-2 border-t border-border">
                      <button
                        type="button"
                        onClick={() => setShowFoodMenu(!showFoodMenu)}
                        className="w-full flex items-center justify-between p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <UtensilsCrossed className="w-5 h-5 text-blue-500" />
                          <div className="text-left">
                            <p className="font-bold text-sm">Want to order something?</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Search & select items (Optional)</p>
                          </div>
                        </div>
                        {selectedItemIds.size > 0 && (
                          <div className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {selectedItemIds.size}
                          </div>
                        )}
                      </button>

                      {showFoodMenu && (
                        <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search food by name..."
                              className="w-full h-10 pl-9 pr-4 bg-muted/50 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-2 max-h-[250px] overflow-y-auto pr-1">
                            {filteredItems.map(item => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => toggleItemSelection(item.id)}
                                className={cn(
                                  "flex items-center justify-between p-3 rounded-xl transition-all border",
                                  selectedItemIds.has(item.id)
                                    ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20"
                                    : "bg-muted/30 border-transparent hover:border-blue-200"
                                )}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg overflow-hidden relative bg-white/20">
                                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                                  </div>
                                  <span className="text-sm font-medium">{item.name}</span>
                                </div>
                                {selectedItemIds.has(item.id) ? (
                                  <Minus className="w-4 h-4" />
                                ) : (
                                  <Plus className="w-4 h-4 opacity-50" />
                                )}
                              </button>
                            ))}
                            {filteredItems.length === 0 && (
                              <p className="text-center py-4 text-xs text-muted-foreground">No items found.</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {status === "error" && (
                      <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-50 rounded-lg">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errorMessage}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-4 border-t border-border bg-background">
                    <button
                      type="submit"
                      disabled={loading || !tableNumber}
                      className="w-full h-14 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-lg shadow-blue-500/25"
                    >
                      {loading ? "Notifying..." : "Notify Cashier"}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-full h-12 text-sm text-muted-foreground font-medium hover:text-foreground mt-2"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes ring-vibrate {
          0% { transform: rotate(0); }
          5% { transform: rotate(15deg); }
          10% { transform: rotate(-15deg); }
          15% { transform: rotate(10deg); }
          20% { transform: rotate(-10deg); }
          25% { transform: rotate(0); }
          100% { transform: rotate(0); }
        }
        .animate-ring-vibrate {
          animation: ring-vibrate 2s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  )
}
