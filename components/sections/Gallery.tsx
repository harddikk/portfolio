"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/ui/Section";
import { useTheme } from "@/context/ThemeContext";

const categories = [
    { id: "all", name: "All", icon: "✨" },
    { id: "resumatch", name: "ResuMatch", icon: "🎯" },
    { id: "research", name: "Research", icon: "🔬" },
    { id: "notesy", name: "Notesy", icon: "📝" },
    { id: "snapshots", name: "Snapshots", icon: "📸" },
];

// Sample gallery items - replace with your actual images
const galleryItems = [
    // ResuMatch - 4 items
    { id: 1, category: "resumatch", imageUrl: "/images/gallery/res.png", title: "ResuMatch" },
    { id: 2, category: "resumatch", imageUrl: "/images/gallery/res-3.png", title: "Home Page" },
    { id: 3, category: "resumatch", imageUrl: "/images/gallery/analysis.png", title: "Analysis Dashboard" },
    { id: 4, category: "resumatch", imageUrl: "/images/gallery/res-4.png", title: "Upload Resume" },

    // Research - 4 items
    { id: 5, category: "research", imageUrl: "/images/gallery/roc-model comparison.png", title: "ROC Model Comparison" },
    { id: 6, category: "research", imageUrl: "/images/gallery/presicion recall - model analysis.png", title: "Precision Recall Model Analysis" },
    { id: 7, category: "research", imageUrl: "/images/gallery/learning curves.png", title: "Learning Curves" },
    { id: 8, category: "research", imageUrl: "/images/gallery/abstract.png", title: "Abstract" },

    // Notesy - 4 items
    { id: 9, category: "notesy", imageUrl: "/images/gallery/home.png", title: "Home Page" },
    { id: 10, category: "notesy", imageUrl: "/images/gallery/add.png", title: "Add a Note" },
    { id: 11, category: "notesy", imageUrl: "/images/gallery/settings.png", title: "Settings" },
    { id: 12, category: "notesy", imageUrl: "/images/gallery/pin.jpeg", title: "Password Protection" },

    // Snapshots - 6 items
    { id: 13, category: "snapshots", imageUrl: "/images/gallery/random-1.png", title: "Behind the Scenes" },
    { id: 14, category: "snapshots", imageUrl: "/images/gallery/random.png", title: "Development Setup" },
    { id: 15, category: "snapshots", imageUrl: "/images/gallery/random-3.png", title: "Workspace Vibes" },
    { id: 16, category: "snapshots", imageUrl: "/images/gallery/random-4.png", title: "Code & Coffee" },
    { id: 17, category: "snapshots", imageUrl: "/images/gallery/random-5.png", title: "Late Night Coding" },
    { id: 18, category: "snapshots", imageUrl: "/images/gallery/random-6.png", title: "Project Planning" },
];

export default function Gallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState("all");
    const [displayItems, setDisplayItems] = useState<typeof galleryItems>([]);
    const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
    const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
    const positionsRef = useRef<Map<string, { x: number; y: number }>>(new Map());
    const { setTheme, getHexColor } = useTheme();
    const themeColor = getHexColor("emerald-400");

    // Initialize with randomized items
    useEffect(() => {
        const shuffled = [...galleryItems].sort(() => Math.random() - 0.5);
        setDisplayItems(shuffled);
    }, []);

    // Set Theme
    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                onEnter: () => setTheme("emerald-400"),
                onEnterBack: () => setTheme("emerald-400"),
            });
        }, containerRef);
        return () => ctx.revert();
    }, [setTheme]);

    // Close lightbox on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedImage(null);
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedImage]);

    // Capture positions before category change
    const handleCategoryChange = (newCategory: string) => {
        if (!gridRef.current) {
            setActiveCategory(newCategory);
            return;
        }

        // Capture current positions
        const items = gridRef.current.querySelectorAll(".gallery-item");
        const positions = new Map();

        items.forEach((item) => {
            const id = item.getAttribute("data-id");
            const rect = item.getBoundingClientRect();
            if (id) {
                positions.set(id, { x: rect.left, y: rect.top });
            }
        });

        positionsRef.current = positions;
        setActiveCategory(newCategory);
    };

    // Update displayItems when category changes
    useEffect(() => {
        if (displayItems.length === 0) return; // Skip initial render

        let newItems;
        if (activeCategory === "all") {
            newItems = [...galleryItems].sort(() => Math.random() - 0.5);
        } else {
            newItems = galleryItems.filter(item => item.category === activeCategory);
        }

        setDisplayItems(newItems);
    }, [activeCategory]);

    // Animate when displayItems changes
    useEffect(() => {
        if (!gridRef.current || displayItems.length === 0) return;

        // Wait for DOM to update
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (!gridRef.current) return;

                const newItemElements = gridRef.current.querySelectorAll(".gallery-item");
                const oldPositions = positionsRef.current;

                newItemElements.forEach((item) => {
                    const id = item.getAttribute("data-id");
                    if (!id) return;

                    const oldPos = oldPositions.get(id);
                    const newRect = item.getBoundingClientRect();

                    if (oldPos) {
                        // FLIP animation for items that existed before
                        const deltaX = oldPos.x - newRect.left;
                        const deltaY = oldPos.y - newRect.top;

                        // Only animate if position actually changed
                        if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
                            gsap.fromTo(
                                item,
                                { x: deltaX, y: deltaY, opacity: 1 },
                                {
                                    x: 0,
                                    y: 0,
                                    opacity: 1,
                                    duration: 0.6,
                                    ease: "power3.out",
                                }
                            );
                        }
                    } else {
                        // Fade in new items that weren't visible before
                        gsap.fromTo(
                            item,
                            { opacity: 0, scale: 0.8, y: 30 },
                            {
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                duration: 0.6,
                                ease: "back.out(1.4)",
                            }
                        );
                    }
                });
            });
        });
    }, [displayItems]);

    // Initial entrance animation
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const items = gridRef.current?.querySelectorAll(".gallery-item");
            if (!items) return;

            gsap.fromTo(
                items,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleImageError = (id: number) => {
        setImageErrors(prev => new Set(prev).add(id));
    };

    return (
        <Section id="gallery" className="bg-background relative py-24">
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_65%)]" />
                <div
                    className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 transition-colors duration-700"
                    style={{ backgroundColor: themeColor }}
                />
            </div>

            <div ref={containerRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="text-white">Visual </span>
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r transition-all duration-500"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${themeColor}, ${themeColor}80)`
                            }}
                        >
                            Gallery
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A curated collection of screenshots, designs, and moments from my projects
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            className="group relative px-6 py-3 rounded-full font-medium transition-all duration-300 overflow-hidden"
                            style={{
                                backgroundColor: activeCategory === category.id
                                    ? `${themeColor}20`
                                    : "rgba(255,255,255,0.05)",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: activeCategory === category.id
                                    ? themeColor
                                    : "rgba(255,255,255,0.1)",
                                color: activeCategory === category.id
                                    ? themeColor
                                    : "rgba(255,255,255,0.6)",
                            }}
                        >
                            {/* Glow effect */}
                            <span
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                                style={{ backgroundColor: `${themeColor}40` }}
                            />

                            <span className="relative z-10 flex items-center gap-2">
                                <span>{category.icon}</span>
                                <span>{category.name}</span>
                            </span>
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {displayItems.map((item) => (
                        <div
                            key={item.id}
                            data-id={item.id}
                            onClick={() => setSelectedImage(item)}
                            className="gallery-item group relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {imageErrors.has(item.id) ? (
                                /* Styled placeholder for missing images */
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
                                    <div
                                        className="w-20 h-20 rounded-full mb-4 flex items-center justify-center text-4xl"
                                        style={{ backgroundColor: `${themeColor}20` }}
                                    >
                                        📷
                                    </div>
                                    <p className="text-white/60 text-sm font-medium">{item.title}</p>
                                    <p className="text-white/40 text-xs mt-1">Image not found</p>
                                </div>
                            ) : (
                                <>
                                    {/* Image with object-contain for proper aspect ratio */}
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        onError={() => handleImageError(item.id)}
                                        className="absolute inset-0 w-full h-full object-contain bg-black/20 transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Title */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                                        <p className="text-white/60 text-sm mt-1">Click to view</p>
                                    </div>

                                    {/* Glow Border */}
                                    <div
                                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            boxShadow: `0 0 30px ${themeColor}40, inset 0 0 30px ${themeColor}10`
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {displayItems.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No images in this category yet</p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 group z-10"
                    >
                        <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Image container */}
                    <div
                        className="relative max-w-7xl max-h-full w-full h-full flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <img
                            src={selectedImage.imageUrl}
                            alt={selectedImage.title}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            style={{ boxShadow: `0 0 100px ${themeColor}40` }}
                        />

                        {/* Title bar */}
                        <div className="mt-6 text-center">
                            <h3 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h3>
                            <p className="text-white/60 text-sm">Press ESC or click outside to close</p>
                        </div>
                    </div>
                </div>
            )}
        </Section>
    );
}
