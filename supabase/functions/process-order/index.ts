
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to send email using a third-party service
// In production, you'd configure this with your preferred email service
async function sendEmailNotification(orderData) {
  const recipient = Deno.env.get("NOTIFICATION_EMAIL") || "";
  if (!recipient) {
    console.error("No notification email configured");
    return { success: false, error: "No notification email configured" };
  }
  
  // Format the products information
  const productsInfo = orderData.products.map(p => 
    `${p.name} x ${p.quantity} (₦${p.price.toLocaleString()})`
  ).join('\n');
  
  // Create email content
  const emailContent = `
New Order Notification

Customer: ${orderData.customer_name}
Phone: ${orderData.phone}
${orderData.email ? `Email: ${orderData.email}` : ''}
Address: ${orderData.address}

Order Details:
${productsInfo}

Total Amount: ₦${orderData.total_amount.toLocaleString()}
${orderData.delivery_note ? `Delivery Note: ${orderData.delivery_note}` : ''}

Order Time: ${new Date().toLocaleString()}
  `;
  
  try {
    // For now, we'll just log the email content
    // In production, integrate with an email API like SendGrid, Resend, etc.
    console.log("Would send email to:", recipient);
    console.log("Email content:", emailContent);
    
    return { 
      success: true, 
      message: "Email notification logged (actual sending disabled)" 
    };
  } catch (error) {
    console.error("Error sending notification:", error);
    return { success: false, error: error.message };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get the request body
    const orderData = await req.json();
    
    // Validate the required fields
    if (!orderData.customer_name || !orderData.phone || !orderData.address || !orderData.products || !orderData.total_amount) {
      throw new Error("Missing required fields in order data");
    }
    
    // Get Supabase connection
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Insert order into the database
    const { data: order, error: insertError } = await supabase
      .from('orders')
      .insert([{
        customer_name: orderData.customer_name,
        phone: orderData.phone,
        email: orderData.email || null,
        address: orderData.address,
        products: orderData.products,
        total_amount: orderData.total_amount,
        delivery_note: orderData.delivery_note || null,
        user_id: orderData.user_id || null,
        status: 'pending',
        payment_status: 'unpaid'
      }])
      .select()
      .single();
    
    if (insertError) {
      throw insertError;
    }
    
    // Send notification
    const notificationResult = await sendEmailNotification(orderData);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Order received successfully",
        order,
        notification: notificationResult
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error processing order:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
