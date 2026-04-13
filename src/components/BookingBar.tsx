import * as React from "react";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, Users, MapPin, Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "../../lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "motion/react";

interface BookingBarProps {
  onSearch?: (filters: { destination: string; date: DateRange | undefined; guests: string }) => void;
}

export function BookingBar({ onSearch }: BookingBarProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [guests, setGuests] = React.useState("2");
  const [destination, setDestination] = React.useState("all");

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ destination, date, guests });
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="w-full max-w-6xl mx-auto -mt-12 relative z-20 px-4"
    >
      <div className="bg-white rounded-2xl p-2 booking-bar-shadow grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
        {/* Destination */}
        <div className="flex flex-col px-4 py-2 border-r border-gray-100 last:border-0">
          <label className="text-[10px] uppercase tracking-wider font-semibold text-brand-olive mb-1 flex items-center gap-1">
            <MapPin size={12} /> Destination
          </label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger className="border-0 p-0 h-auto focus:ring-0 text-sm font-medium">
              <SelectValue placeholder="Where to?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Namibia</SelectItem>
              <SelectItem value="Etosha National Park">Etosha National Park</SelectItem>
              <SelectItem value="Zambezi Region">Zambezi Region</SelectItem>
              <SelectItem value="Swakopmund">Swakopmund</SelectItem>
              <SelectItem value="Damaraland">Damaraland</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dates */}
        <div className="flex flex-col px-4 py-2 border-r border-gray-100 last:border-0 md:col-span-1">
          <label className="text-[10px] uppercase tracking-wider font-semibold text-brand-olive mb-1 flex items-center gap-1">
            <CalendarIcon size={12} /> Dates
          </label>
          <Popover>
            <PopoverTrigger className="text-left text-sm font-medium focus:outline-none border-0 p-0 h-auto bg-transparent hover:bg-transparent">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
                  </>
                ) : (
                  format(date.from, "LLL dd")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="flex flex-col px-4 py-2 border-r border-gray-100 last:border-0">
          <label className="text-[10px] uppercase tracking-wider font-semibold text-brand-olive mb-1 flex items-center gap-1">
            <Users size={12} /> Guests
          </label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="border-0 p-0 h-auto focus:ring-0 text-sm font-medium">
              <SelectValue placeholder="Guests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Adult</SelectItem>
              <SelectItem value="2">2 Adults</SelectItem>
              <SelectItem value="3">3 Adults</SelectItem>
              <SelectItem value="4">4 Adults</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="px-2">
          <Button 
            onClick={handleSearch}
            className="w-full bg-brand-olive hover:bg-brand-wood text-white rounded-xl h-12 gap-2 font-medium"
          >
            <Search size={18} />
            Check Availability
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
