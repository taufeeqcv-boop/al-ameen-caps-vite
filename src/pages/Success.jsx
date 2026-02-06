import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto px-4 pt-32 pb-24 text-center">
        <h1 className="font-serif text-3xl font-semibold text-primary">Order Confirmed</h1>
        <p className="mt-4 text-primary/80">
          We have successfully received your payment. Thank you for choosing Al-Ameen Caps. We sincerely appreciate your business and look forward to serving you again. We will be in touch shortly with your delivery details.
        </p>
        <Link to="/shop" className="btn btn-primary w-full mt-8 py-4 px-10 inline-block text-center">
          Continue Shopping
        </Link>
      </main>
      <Footer />
    </div>
  );
}
