import * as React from "react";
import { Property } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";

interface BookingDialogProps {
  property: Property;
  trigger: React.ReactNode;
}

export function BookingDialog({ property, trigger }: BookingDialogProps) {
  const [step, setStep] = React.useState<"form" | "loading" | "success">("form");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("loading");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property.id,
          ...formData,
          totalAmount: property.price * 3, // Mock 3 nights
        }),
      });
      
      if (response.ok) {
        setStep("success");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      setStep("form");
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && setStep("form")}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        {step === "form" && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Book Your Stay</DialogTitle>
              <DialogDescription>
                Confirm your booking at <span className="font-semibold text-brand-olive">{property.name}</span>.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your full name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="e.g. +264 81 123 4567" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="rounded-xl"
                />
              </div>
              <div className="bg-brand-sand p-4 rounded-xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span>3 Nights (Estimated)</span>
                  <span>NAD {(property.price * 3).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-brand-wood/10 pt-2">
                  <span>Total</span>
                  <span>NAD {(property.price * 3).toLocaleString()}</span>
                </div>
              </div>
              <Button type="submit" className="w-full bg-brand-olive hover:bg-brand-wood text-white rounded-xl h-12">
                Confirm Booking
              </Button>
            </form>
          </>
        )}

        {step === "loading" && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 text-brand-olive animate-spin" />
            <p className="font-medium text-brand-wood">Processing your booking...</p>
          </div>
        )}

        {step === "success" && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-brand-wood">Booking Confirmed!</h3>
            <p className="text-gray-500 max-w-[280px]">
              We've sent a confirmation email to <span className="font-medium text-brand-wood">{formData.email}</span>.
            </p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-brand-olive text-white rounded-xl px-8"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
