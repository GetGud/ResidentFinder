import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Heart,
    Share2,
    MapPin,
    BedDouble,
    Bath,
    Square,
    CheckCircle2,
    Calendar,
    MessageSquare,
    Phone,
    Star,
    ChevronRight,
    ChevronDown,
    Wifi,
    Car,
    Utensils,
    Dumbbell,
    Dog,
    Wind,
    ArrowLeft,
    BadgeCheck,
    DollarSign,
    PawPrint,
    ThumbsUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { MOCK_PROPERTIES } from '../data/mockData';
import { FloorPlan } from '../types';
import { TourSchedulerModal } from '../components/TourSchedulerModal';

const SECTIONS = [
    { id: 'pricing', label: 'Pricing' },
    { id: 'fees', label: 'Fees & Policies' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'reviews', label: 'Reviews' }
];

export function PropertyDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [isSaved, setIsSaved] = useState(false);
    const [activeSection, setActiveSection] = useState('pricing');
    const [expandedFloorPlan, setExpandedFloorPlan] = useState<string | null>(null);
    const [showTourModal, setShowTourModal] = useState(false);
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    // Find property or use first one as fallback
    const property = MOCK_PROPERTIES.find(p => p.id === id) || MOCK_PROPERTIES[0];

    const images = property.images.length > 0 ? [
        ...property.images,
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80"
    ].slice(0, 5) : [
        "https://images.unsplash.com/photo-1600596542815-2250657d2fc5?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80"
    ];

    // Scroll spy for active section
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            for (const section of SECTIONS) {
                const element = sectionRefs.current[section.id];
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = sectionRefs.current[sectionId];
        if (element) {
            const offset = 180;
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
    };

    const toggleFloorPlan = (fpId: string) => {
        setExpandedFloorPlan(expandedFloorPlan === fpId ? null : fpId);
    };

    return (
        <div className="bg-white min-h-screen font-sans text-slate-900">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Manrope', sans-serif; }
      `}</style>

            {/* --- Sticky Header --- */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center text-sm text-slate-500 space-x-2">
                        <Link to="/search" className="flex items-center gap-2 text-[#134e4a] hover:underline">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Search</span>
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="font-medium text-slate-900">{property.address}</span>
                        {property.isVerified && (
                            <span className="ml-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                <BadgeCheck className="w-3 h-3" />
                                VERIFIED
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsSaved(!isSaved)}
                            className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-[#134e4a] transition-colors px-4 py-2 rounded-full hover:bg-slate-50"
                        >
                            <Heart className={cn("w-5 h-5", isSaved && "fill-red-500 text-red-500")} />
                            <span>{isSaved ? 'Saved' : 'Save'}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-[#134e4a] transition-colors px-4 py-2 rounded-full hover:bg-slate-50">
                            <Share2 className="w-5 h-5" />
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* --- Sticky Anchor Navigation --- */}
            <nav className="sticky top-16 z-40 bg-white border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                        {SECTIONS.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={cn(
                                    "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all",
                                    activeSection === section.id
                                        ? "border-[#134e4a] text-[#134e4a]"
                                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                )}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* --- Hero Gallery (Bento Style) --- */}
            <section className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px] rounded-2xl overflow-hidden shadow-sm">
                    {/* Main Image */}
                    <div className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden">
                        <img
                            src={images[0]}
                            alt="Main property view"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                            Virtual Tour Available
                        </div>
                    </div>
                    {/* Side Images */}
                    {images.slice(1).map((img, idx) => (
                        <div key={idx} className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden">
                            <img
                                src={img}
                                alt={`Property view ${idx + 2}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {idx === 3 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium hover:bg-black/40 transition-colors">
                                    +{property.images.length - 4 > 0 ? property.images.length - 4 : 20} More Photos
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Main Content Split --- */}
            <main className="max-w-7xl mx-auto px-6 pb-20">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT COLUMN: Content (2/3) */}
                    <div className="lg:w-2/3 space-y-12">

                        {/* Header Info */}
                        <div className="border-b border-slate-200 pb-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-4xl font-bold text-slate-900 mb-2">{property.address}</h1>
                                    <div className="flex items-center text-slate-600">
                                        <MapPin className="w-5 h-5 mr-1 text-[#134e4a]" />
                                        <span className="text-lg">{property.cityStateZip}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-3xl font-bold text-[#134e4a]">{property.price}</div>
                                    <div className="text-slate-500 font-medium mt-1">Monthly Rent</div>
                                </div>
                            </div>

                            {/* Stats Bar */}
                            <div className="flex items-center justify-between bg-slate-50 rounded-xl p-6 border border-slate-100">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                                        <BedDouble className="w-6 h-6 text-[#134e4a]" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-500 font-medium">Bedrooms</div>
                                        <div className="font-bold text-slate-900">{property.beds}</div>
                                    </div>
                                </div>
                                <div className="w-px h-10 bg-slate-200" />
                                <div className="flex items-center space-x-3">
                                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                                        <Bath className="w-6 h-6 text-[#134e4a]" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-500 font-medium">Bathrooms</div>
                                        <div className="font-bold text-slate-900">{property.baths}</div>
                                    </div>
                                </div>
                                <div className="w-px h-10 bg-slate-200" />
                                <div className="flex items-center space-x-3">
                                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                                        <Square className="w-6 h-6 text-[#134e4a]" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-500 font-medium">Square Feet</div>
                                        <div className="font-bold text-slate-900">{property.sqft}</div>
                                    </div>
                                </div>
                                <div className="w-px h-10 bg-slate-200" />
                                <div className="flex items-center space-x-3">
                                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                                        <CheckCircle2 className="w-6 h-6 text-[#134e4a]" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-500 font-medium">Status</div>
                                        <div className="font-bold text-green-600">{property.availability}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- PRICING / FLOOR PLANS SECTION --- */}
                        <section ref={el => sectionRefs.current['pricing'] = el} id="pricing">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Floor Plans & Pricing</h2>

                            {property.floorPlans && property.floorPlans.length > 0 ? (
                                <div className="space-y-4">
                                    {property.floorPlans.map((fp: FloorPlan) => (
                                        <div key={fp.id} className="border border-slate-200 rounded-xl overflow-hidden">
                                            {/* Floor Plan Header */}
                                            <button
                                                onClick={() => toggleFloorPlan(fp.id)}
                                                className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition-colors"
                                            >
                                                <div className="flex items-center gap-6">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-slate-900">{fp.name}</h3>
                                                        <p className="text-sm text-slate-500">
                                                            {fp.beds === 0 ? 'Studio' : `${fp.beds} Bed`} • {fp.baths} Bath • {fp.sqftMin}-{fp.sqftMax} sqft
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-[#134e4a]">
                                                            ${fp.priceMin.toLocaleString()} - ${fp.priceMax.toLocaleString()}
                                                        </div>
                                                        <div className="text-sm text-green-600 font-medium">
                                                            {fp.units.filter(u => u.availableDate === 'Now').length} Units Available Now
                                                        </div>
                                                    </div>
                                                    <ChevronDown className={cn(
                                                        "w-5 h-5 text-slate-400 transition-transform",
                                                        expandedFloorPlan === fp.id && "rotate-180"
                                                    )} />
                                                </div>
                                            </button>

                                            {/* Units Table */}
                                            <AnimatePresence>
                                                {expandedFloorPlan === fp.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-4 border-t border-slate-200">
                                                            <table className="w-full">
                                                                <thead>
                                                                    <tr className="text-left text-sm text-slate-500 border-b border-slate-100">
                                                                        <th className="pb-2 font-medium">Unit</th>
                                                                        <th className="pb-2 font-medium">Sq Ft</th>
                                                                        <th className="pb-2 font-medium">Price</th>
                                                                        <th className="pb-2 font-medium">Available</th>
                                                                        <th className="pb-2 font-medium"></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {fp.units.map((unit, idx) => (
                                                                        <tr key={idx} className="border-b border-slate-50 last:border-0">
                                                                            <td className="py-3 font-medium text-slate-900">#{unit.unitNumber}</td>
                                                                            <td className="py-3 text-slate-600">{unit.sqft} sqft</td>
                                                                            <td className="py-3 font-bold text-[#134e4a]">${unit.price.toLocaleString()}/mo</td>
                                                                            <td className="py-3">
                                                                                <span className={cn(
                                                                                    "text-sm font-medium px-2 py-1 rounded",
                                                                                    unit.availableDate === 'Now'
                                                                                        ? "bg-green-100 text-green-700"
                                                                                        : "bg-slate-100 text-slate-600"
                                                                                )}>
                                                                                    {unit.availableDate}
                                                                                </span>
                                                                            </td>
                                                                            <td className="py-3 text-right">
                                                                                <button className="px-4 py-1.5 bg-[#134e4a] text-white text-sm font-semibold rounded-lg hover:bg-[#0f3f3c] transition-colors">
                                                                                    Apply
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-slate-50 rounded-xl p-6 text-center text-slate-500">
                                    Contact us for current availability and pricing.
                                </div>
                            )}
                        </section>

                        {/* --- FEES & POLICIES SECTION --- */}
                        <section ref={el => sectionRefs.current['fees'] = el} id="fees">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Fees & Policies</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Fees */}
                                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-[#134e4a]" />
                                        Fees
                                    </h3>
                                    {property.fees && property.fees.length > 0 ? (
                                        <div className="space-y-3">
                                            {property.fees.map((fee, idx) => (
                                                <div key={idx} className="flex justify-between items-center">
                                                    <span className="text-slate-600">{fee.name}</span>
                                                    <span className="font-medium text-slate-900">{fee.amount}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-slate-500">Contact for fee details</p>
                                    )}
                                </div>

                                {/* Pet Policy */}
                                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <PawPrint className="w-5 h-5 text-[#134e4a]" />
                                        Pet Policy
                                    </h3>
                                    {property.petPolicy ? (
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-600">Pets Allowed</span>
                                                <span className={cn("font-medium", property.petPolicy.allowed ? "text-green-600" : "text-red-600")}>
                                                    {property.petPolicy.allowed ? 'Yes' : 'No'}
                                                </span>
                                            </div>
                                            {property.petPolicy.deposit && (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-600">Pet Deposit</span>
                                                    <span className="font-medium text-slate-900">${property.petPolicy.deposit}</span>
                                                </div>
                                            )}
                                            {property.petPolicy.monthlyRent && (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-600">Monthly Pet Rent</span>
                                                    <span className="font-medium text-slate-900">${property.petPolicy.monthlyRent}/mo</span>
                                                </div>
                                            )}
                                            {property.petPolicy.maxWeight && (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-600">Max Weight</span>
                                                    <span className="font-medium text-slate-900">{property.petPolicy.maxWeight} lbs</span>
                                                </div>
                                            )}
                                            {property.petPolicy.restrictions && (
                                                <p className="text-sm text-slate-500 mt-2 pt-2 border-t border-slate-200">
                                                    {property.petPolicy.restrictions}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-slate-500">{property.petsAllowed ? 'Pets allowed - contact for details' : 'No pets allowed'}</p>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* --- AMENITIES SECTION --- */}
                        <section ref={el => sectionRefs.current['amenities'] = el} id="amenities">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                                {[
                                    { icon: Wifi, label: "High-Speed Internet" },
                                    { icon: Car, label: "EV Charging Stations" },
                                    { icon: Utensils, label: "Chef's Kitchens" },
                                    { icon: Dumbbell, label: "24/7 Fitness Center" },
                                    { icon: Dog, label: property.petsAllowed ? "Pet Friendly" : "No Pets" },
                                    { icon: Wind, label: "A/C in Every Unit" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center space-x-3 group cursor-default">
                                        <div className="p-2 rounded-full bg-slate-50 group-hover:bg-[#134e4a]/10 transition-colors">
                                            <item.icon className="w-5 h-5 text-slate-500 group-hover:text-[#134e4a] transition-colors" />
                                        </div>
                                        <span className="text-slate-700 font-medium">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-8 px-6 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors w-full md:w-auto">
                                See all amenities
                            </button>
                        </section>

                        {/* --- REVIEWS SECTION --- */}
                        <section ref={el => sectionRefs.current['reviews'] = el} id="reviews">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">Reviews</h2>
                                {property.rating && (
                                    <div className="flex items-center gap-2 bg-[#134e4a]/10 px-4 py-2 rounded-lg">
                                        <Star className="w-5 h-5 text-[#134e4a] fill-[#134e4a]" />
                                        <span className="text-xl font-bold text-[#134e4a]">{property.rating}</span>
                                        <span className="text-slate-500">({property.reviewCount} reviews)</span>
                                    </div>
                                )}
                            </div>

                            {property.reviews && property.reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {property.reviews.map((review) => (
                                        <div key={review.id} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <div className="font-bold text-slate-900">{review.author}</div>
                                                    <div className="text-sm text-slate-500">{review.date}</div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={cn(
                                                                "w-4 h-4",
                                                                i < review.rating
                                                                    ? "text-yellow-400 fill-yellow-400"
                                                                    : "text-slate-200"
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-slate-600 mb-3">{review.text}</p>
                                            {review.helpful && (
                                                <div className="flex items-center gap-1 text-sm text-slate-500">
                                                    <ThumbsUp className="w-4 h-4" />
                                                    <span>{review.helpful} found this helpful</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <button className="w-full py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                                        Show all {property.reviewCount} reviews
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-slate-50 rounded-xl p-6 text-center">
                                    <p className="text-slate-500 mb-4">No reviews yet</p>
                                    <button className="px-6 py-2.5 bg-[#134e4a] text-white font-semibold rounded-lg hover:bg-[#0f3f3c] transition-colors">
                                        Write a Review
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* RIGHT COLUMN: Sticky Sidebar (1/3) */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-40 space-y-6">

                            {/* Tour Request Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                                {property.isSpecial && (
                                    <div className="bg-[#134e4a] p-4 text-white text-center font-bold">
                                        Special Offer: One Month Free Rent!
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">Request a Tour</h3>

                                    {/* Calendar Strip */}
                                    <div className="flex justify-between mb-6">
                                        {[
                                            { day: 'Mon', date: '12' },
                                            { day: 'Tue', date: '13' },
                                            { day: 'Wed', date: '14' },
                                            { day: 'Thu', date: '15' },
                                        ].map((d, i) => (
                                            <button key={i} className={cn(
                                                "flex flex-col items-center justify-center w-14 h-16 rounded-xl border transition-all",
                                                i === 1 ? "bg-[#134e4a] text-white border-[#134e4a] shadow-md transform -translate-y-1" : "bg-white text-slate-600 border-slate-200 hover:border-[#134e4a]/50 hover:bg-slate-50"
                                            )}>
                                                <span className="text-xs font-medium uppercase">{d.day}</span>
                                                <span className="text-lg font-bold">{d.date}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <button
                                            onClick={() => setShowTourModal(true)}
                                            className="w-full py-3.5 bg-[#134e4a] hover:bg-[#0f3f3c] text-white rounded-xl font-bold text-lg shadow-md transition-all flex items-center justify-center gap-2"
                                        >
                                            <Calendar className="w-5 h-5" />
                                            Schedule Tour
                                        </button>
                                        <button className="w-full py-3.5 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                                            <MessageSquare className="w-5 h-5" />
                                            Request Info
                                        </button>
                                    </div>

                                    <div className="mt-6 text-center text-xs text-slate-400">
                                        It's free, with no obligation - cancel anytime
                                    </div>
                                </div>
                            </div>

                            {/* Contact Agent Card */}
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-slate-300 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" alt="Agent" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">James Wilson</div>
                                        <div className="text-sm text-slate-500">Leasing Consultant</div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <a
                                        href="tel:2065550123"
                                        className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition-colors"
                                    >
                                        <Phone className="w-4 h-4" /> (206) 555-0123
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>

            {/* Tour Scheduler Modal */}
            <TourSchedulerModal
                isOpen={showTourModal}
                onClose={() => setShowTourModal(false)}
                propertyName={property.address}
            />
        </div>
    );
}

export default PropertyDetailsPage;

