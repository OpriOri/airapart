import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Apartments from '@/pages/Apartments';
import ApartmentDetails from '@/pages/ApartmentDetails';
import CustomApartmentDetails from '@/pages/CustomApartmentDetails';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import PaymentSuccess from '@/pages/PaymentSuccess';
import CancelBooking from '@/pages/CancelBooking';
import BookingCancelForm from '@/pages/BookingCancelForm';
import { CookieConsent } from '@/components/CookieConsent';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/apartments" element={<Apartments />} />
                <Route path="/apartments/:id" element={<CustomApartmentDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/bookings/cancel" element={<BookingCancelForm />} />
                <Route path="/bookings/cancel/:bookingId" element={<CancelBooking />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <CookieConsent />
        </Router>
    );
}

export default App;