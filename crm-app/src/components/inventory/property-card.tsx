"use client";

import { useState } from "react";
import { Building2, MessageSquare, IndianRupee, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PropertyActions } from "./property-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type Property = {
  id: string;
  projectName: string;
  developer: string;
  location: string;
  configuration: string;
  possessionTimeline: string | null;
  basePrice: string | null;
};

export function PropertyCard({ property }: { property: Property }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const defaultMessage = `Hello! I have a great property for you: *${property.projectName}* by ${property.developer} in ${property.location}. It is a ${property.configuration} starting at ${property.basePrice}. Let me know if you want to schedule a site visit!`;
  const [message, setMessage] = useState(defaultMessage);

  const handleWhatsAppLaunch = () => {
    // Remove any non-numeric characters from the phone number
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    
    // Default to +91 (India) if no country code is provided and it's a 10 digit number
    const finalPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const url = `https://wa.me/${finalPhone}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <Card className="glass-card border-border/50 hover:border-primary/30 transition-all overflow-hidden flex flex-col h-full">
      <CardContent className="p-5 flex-1">
        <div className="flex justify-between items-start gap-4 mb-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{property.projectName}</h3>
            <p className="text-sm text-muted-foreground">{property.developer}</p>
          </div>
          <div className="flex items-start gap-2">
            <PropertyActions property={property} />
            <div className="bg-primary/10 p-2 rounded-lg shrink-0">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <span className="text-foreground/90 leading-tight">{property.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-foreground/90">{property.possessionTimeline || "Ready to Move"}</span>
          </div>

          {property.basePrice && (
            <div className="flex items-center gap-2 text-sm font-medium">
              <IndianRupee className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-emerald-400">{property.basePrice}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {property.configuration.split(",").map((config) => (
            <Badge key={config.trim()} variant="secondary" className="bg-muted text-foreground/80 font-medium">
              {config.trim()}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t border-border/10 mt-auto bg-muted/10">
        <Dialog>
          <DialogTrigger render={<Button className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white gap-2 mt-4" />}>
            <MessageSquare className="w-4 h-4" />
            Send via WhatsApp
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] border-border/50 bg-background/95 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-whatsapp">
                <MessageSquare className="w-5 h-5" />
                WhatsApp Brochure Engine
              </DialogTitle>
              <DialogDescription>
                Customize your pitch and send it directly to your client.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Client Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="e.g. 9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-muted/50 border-border/50"
                />
                <p className="text-[10px] text-muted-foreground">Will auto-prefix +91 for 10-digit numbers.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message Template</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px] bg-muted/50 border-border/50 resize-none text-sm leading-relaxed"
                />
              </div>
            </div>
            <Button 
              onClick={handleWhatsAppLaunch} 
              disabled={!phoneNumber || !message}
              className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white gap-2"
            >
              Launch WhatsApp <ExternalLink className="w-4 h-4" />
            </Button>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
