export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  libraries: ["places"] as const,
  defaultCenter: { lat: 40.7128, lng: -74.006 }, // NYC
  defaultZoom: 14,
  searchRadius: 1500, // 1.5km
}

export const PLACE_TYPES = {
  gym: "gym",
  grocery: "grocery_or_supermarket",
  transit: "transit_station",
  bus: "bus_station",
} as const

export const MARKER_COLORS = {
  gym: "#ef4444",
  grocery: "#22c55e",
  transit: "#3b82f6",
  default: "#6b7280",
} as const
