
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface OrderFormProps {
  cartItems?: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount?: number;
}

const OrderForm: React.FC<OrderFormProps> = ({ 
  cartItems = [],
  totalAmount = 0
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: user ? user.name || '' : '',
    phone: '',
    email: user ? user.email || '' : '',
    address: '',
    deliveryNote: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart before placing an order",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Call the order processing endpoint
      const response = await fetch(`https://qmhovxtnavxbuonhnmwl.supabase.co/functions/v1/process-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: formData.customerName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          products: cartItems,
          total_amount: totalAmount,
          delivery_note: formData.deliveryNote,
          user_id: user?.id || null
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to place order');
      }

      toast({
        title: "Order placed successfully!",
        description: "We'll contact you shortly to confirm your order.",
      });

      // Reset form
      setFormData({
        customerName: user ? user.name || '' : '',
        phone: '',
        email: user ? user.email || '' : '',
        address: '',
        deliveryNote: ''
      });

      // Additional action you might want to perform after successful order
      // e.g., clearing the cart, redirecting, etc.

    } catch (error: any) {
      toast({
        title: "Failed to place order",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Order</CardTitle>
        <CardDescription>Please provide your delivery information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Full Name</Label>
            <Input
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full delivery address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryNote">Delivery Notes (Optional)</Label>
            <Textarea
              id="deliveryNote"
              name="deliveryNote"
              value={formData.deliveryNote}
              onChange={handleChange}
              placeholder="Any special instructions for delivery"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : `Place Order (₦${totalAmount.toLocaleString()})`}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
