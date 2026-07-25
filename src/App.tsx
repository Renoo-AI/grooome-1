import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import Home from "@/pages/Home";
import ServicesPage from "@/pages/Services";
import BookingPage from "@/pages/Booking";
import NotFound from "@/pages/NotFound";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // small delay so the target section is mounted
      const id = hash.replace("#", "");
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };
      if (!tryScroll()) {
        const t = setTimeout(tryScroll, 250);
        return () => clearTimeout(t);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isBookingPage = location.pathname === "/booking";
  const isKnownRoute = ["/", "/services", "/booking"].includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isBookingPage && isKnownRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollManager />
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}
