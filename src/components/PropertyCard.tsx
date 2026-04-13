import * as React from "react";
import { Property } from "../types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { BookingDialog } from "./BookingDialog";

interface PropertyCardProps {
  property: Property;
  index: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
    >
      <Card className="overflow-hidden border-0 bg-white group cursor-pointer hover:shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={property.image} 
            alt={property.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/90 text-brand-wood hover:bg-white border-0 backdrop-blur-sm">
              {property.location}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 bg-brand-olive text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
            <Star size={12} fill="currentColor" /> {property.rating}
          </div>
        </div>
        <CardContent className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-serif font-semibold text-brand-wood leading-tight">
              {property.name}
            </h3>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
            {property.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity} className="text-[10px] uppercase tracking-widest text-brand-olive font-bold">
                • {amenity}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-gray-50 mt-auto">
          <div>
            <span className="text-xs text-gray-400 block uppercase tracking-tighter">From</span>
            <span className="text-xl font-bold text-brand-wood">NAD {property.price.toLocaleString()}</span>
            <span className="text-xs text-gray-400 ml-1">/ night</span>
          </div>
          <BookingDialog 
            property={property}
            trigger={
              <Button variant="outline" className="border-brand-olive text-brand-olive hover:bg-brand-olive hover:text-white rounded-xl">
                Book Now
              </Button>
            }
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
