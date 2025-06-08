import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail, Clock, User, FileText } from 'lucide-react';

export default function Contact() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24">
                {/* Hero section */}
                <section className="bg-secondary/30">
                    <div className="container px-4 py-16 mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            У вас есть вопросы или предложения? Напишите нам, и мы обязательно свяжемся с вами в ближайшее время.
                        </p>
                    </div>
                </section>

                {/* Contact info and form */}
                <section className="container px-4 py-16 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-6">Наши контакты</h2>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Адрес</h3>
                                        <p className="text-muted-foreground">г. Минеральные воды, ул. Советская, д. 123</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Телефон</h3>
                                        <p className="text-muted-foreground">+7 (928) 351-91-92</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Mail className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Email</h3>
                                        <p className="text-muted-foreground">info@apartrent.ru</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Clock className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Часы работы</h3>
                                        <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00</p>
                                        <p className="text-muted-foreground">Сб-Вс: 10:00 - 18:00</p>
                                    </div>
                                </div>

                                {/* Реквизиты исполнителя */}
                                <div className="border-t pt-6 mt-8">
                                    <h3 className="font-semibold text-lg mb-4">Реквизиты исполнителя</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-4">
                                            <div className="bg-primary/10 p-3 rounded-full">
                                                <User className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Индивидуальный предприниматель</h4>
                                                <p className="text-muted-foreground">Буроменская Надежда Петровна</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-4">
                                            <div className="bg-primary/10 p-3 rounded-full">
                                                <FileText className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">ИНН</h4>
                                                <p className="text-muted-foreground">263006309130</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-6">Напишите нам</h2>
                            <ContactForm />
                        </div>
                    </div>
                </section>

                {/* Map section */}
                <section className="py-16 bg-muted/30">
                    <div className="container px-4 mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Как нас найти</h2>
                        <div className="rounded-xl overflow-hidden h-[400px] shadow-md border">
                            <iframe
                                src="https://maps.google.com/maps?q=44.203022, 43.104132&z=17&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}