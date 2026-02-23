import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("orders.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT,
    email TEXT,
    address TEXT,
    total INTEGER,
    status TEXT,
    transaction_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const PRODUCTS = [
  { id: 1, name: "Mechanical RGB Keyboard", price: 10499 },
  { id: 2, name: "4K UltraWide Monitor", price: 39999 },
  { id: 3, name: "Wireless Gaming Mouse", price: 6499 },
  { id: 4, name: "Noise Cancelling Headphones", price: 19999 },
  { id: 5, name: "Gaming PC Case", price: 12999 },
  { id: 6, name: "Ergonomic Office Chair", price: 27999 },
  { id: 7, name: "Streamer Microphone", price: 14999 },
  { id: 8, name: "External SSD 2TB", price: 15999 },
  { id: 9, name: "Pendrive", price: 1 }
];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendOrderEmail(order: any, status: 'success' | 'failed') {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("Gmail credentials not configured. Skipping email.");
    return;
  }

  const subject = status === 'success' 
    ? `Order Confirmed - ${order.id}` 
    : `Order Payment Failed - ${order.id}`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #111;">eKart Electronics</h2>
      <p>Hi ${order.customer_name},</p>
      ${status === 'success' 
        ? `<p>Thank you for your order! Your payment was successful and we're processing your items.</p>`
        : `<p>We're sorry, but your payment verification for order <strong>${order.id}</strong> failed. Please try again or contact support.</p>`
      }
      <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Total Amount:</strong> ₹${order.total.toLocaleString()}</p>
        <p><strong>Status:</strong> ${status === 'success' ? 'Paid' : 'Failed'}</p>
      </div>
      <p>If you have any questions, reply to this email or contact us on WhatsApp.</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #888;">© 2026 eKart Electronics. All rights reserved.</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"eKart Support" <${process.env.GMAIL_USER}>`,
      to: order.email,
      subject,
      html,
    });
    console.log(`Email sent to ${order.email} for order ${order.id}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/admin/orders", (req, res) => {
    try {
      const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", (req, res) => {
    const { items, customer } = req.body;
    
    // Validate price on server side
    let calculatedTotal = 0;
    for (const item of items) {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (product) {
        calculatedTotal += product.price * item.quantity;
      }
    }

    const orderId = `EK-${Math.floor(Math.random() * 1000000)}`;
    
    try {
      const stmt = db.prepare(`
        INSERT INTO orders (id, customer_name, email, address, total, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        orderId, 
        `${customer.firstName} ${customer.lastName}`, 
        customer.email, 
        customer.address, 
        calculatedTotal, 
        'pending'
      );

      res.json({ orderId, total: calculatedTotal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.post("/api/verify-payment", (req, res) => {
    const { orderId, transactionId } = req.body;

    // Simple validation: Transaction ID must be 12 digits for UPI
    if (!/^\d{12}$/.test(transactionId)) {
      return res.status(400).json({ error: "Invalid Transaction ID. Must be 12 digits." });
    }

    // In a real app, you'd check with a bank API here.
    // For this project, we'll simulate a check that takes some time.
    // To make it "safe" for the demo, we'll only accept IDs that start with '2026'
    setTimeout(async () => {
      const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(orderId) as any;
      
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      if (!transactionId.startsWith('2026')) {
        // Send failure email
        await sendOrderEmail(order, 'failed');
        return res.status(400).json({ 
          error: "Transaction ID verification failed. For demo purposes, use an ID starting with '2026'." 
        });
      }

      try {
        const stmt = db.prepare(`
          UPDATE orders 
          SET status = 'paid', transaction_id = ? 
          WHERE id = ?
        `);
        const result = stmt.run(transactionId, orderId);

        if (result.changes > 0) {
          // Send success email
          await sendOrderEmail({ ...order, status: 'paid' }, 'success');
          res.json({ success: true });
        } else {
          res.status(404).json({ error: "Order not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Verification failed" });
      }
    }, 2000);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
