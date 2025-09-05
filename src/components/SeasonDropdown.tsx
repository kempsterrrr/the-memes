import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface SeasonOption {
  value: string
  label: string
  count: number
}

interface SeasonDropdownProps {
  seasons: SeasonOption[]
  selectedSeason: string
  onSeasonChange: (season: string) => void
}

export default function SeasonDropdown({ 
  seasons, 
  selectedSeason, 
  onSeasonChange 
}: SeasonDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedSeasonData = seasons.find(s => s.value === selectedSeason)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-transparent border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
      >
        <span>SZN: {selectedSeasonData?.label || "All"}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-black border border-gray-600 rounded-md shadow-lg z-50">
          <div className="py-1">
            {seasons.map((season) => (
              <button
                key={season.value}
                onClick={() => {
                  onSeasonChange(season.value)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-800 transition-colors ${
                  selectedSeason === season.value ? 'bg-gray-700' : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{season.label}</span>
                  <span className="text-gray-400 text-xs">({season.count})</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
