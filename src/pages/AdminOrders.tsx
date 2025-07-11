
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  address: string;
  products: Product[];
  total_amount: number;
  delivery_note: string | null;
  status: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

type SupabaseOrder = Omit<Order, 'products'> & {
  products: any;  // This will hold the JSON from Supabase
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is authenticated and is an admin
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/admin/login');
          return;
        }
        
        // Check if user is an admin
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (profileError || profileData?.role !== 'admin') {
          await supabase.auth.signOut();
          navigate('/admin/login');
        }
      } catch (error) {
        navigate('/admin/login');
      }
    };
    
    checkUser();
  }, [navigate]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (statusFilter) {
          query = query.eq('status', statusFilter);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        // Transform the data to match our Order type
        const transformedOrders: Order[] = (data as SupabaseOrder[]).map(order => ({
          ...order,
          products: Array.isArray(order.products) ? order.products : []
        }));
        
        setOrders(transformedOrders);
      } catch (error: any) {
        toast({
          title: "Error fetching orders",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [statusFilter, toast]);

  // Handle status change
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);
        
      if (error) {
        throw error;
      }
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      toast({
        title: "Status updated",
        description: `Order status updated to ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  // Filter orders by search term
  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true;
    
    const searchTermLower = searchTerm.toLowerCase();
    return (
      order.customer_name.toLowerCase().includes(searchTermLower) ||
      order.phone.includes(searchTerm) ||
      order.email?.toLowerCase().includes(searchTermLower) ||
      order.id.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search by customer, phone or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableCaption>List of all orders</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.slice(0, 8)}...</TableCell>
                    <TableCell>
                      {order.customer_name}
                      <div className="text-xs text-gray-500 mt-1">{order.address}</div>
                    </TableCell>
                    <TableCell>
                      {order.phone}
                      {order.email && <div className="text-xs text-gray-500 mt-1">{order.email}</div>}
                    </TableCell>
                    <TableCell>
                      <div className="max-h-20 overflow-y-auto">
                        {order.products.map((product: Product, idx: number) => (
                          <div key={idx} className="text-sm">
                            {product.name} x{product.quantity}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>₦{order.total_amount.toLocaleString()}</TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                      <div className="text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          order.status === 'pending' ? 'bg-yellow-500' :
                          order.status === 'processing' ? 'bg-blue-500' :
                          order.status === 'shipped' ? 'bg-purple-500' :
                          order.status === 'delivered' ? 'bg-green-500' :
                          'bg-red-500'
                        }
                      >
                        {order.status}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">
                        Payment: {order.payment_status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={order.status} 
                        onValueChange={(value) => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
