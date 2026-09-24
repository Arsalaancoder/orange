import React, { useEffect, useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { api } from '@/services/api';
import type { GalleryItem } from '@/services/api';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';
import { Loader2, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { softPopUpVariant, staggeredContainerVariant } from '@/lib/motionVariants';

export const GalleryPage: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    api.getGallery().then((data) => {
      if (isMounted) {
        setGallery(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ['all', 'campus', 'labs', 'events', 'general'];

  const filteredItems =
    activeCategory === 'all'
      ? gallery
      : gallery.filter((g) => g.category.toLowerCase() === activeCategory);

  return (
    <PageShell title="Campus Gallery" description="Photo gallery showcasing campus infrastructure, laboratories, and clinical training at Orange Group.">
      <section className="section-padding bg-white">
        <Container>
          <SectionHeading
            eyebrow="Visual Tour"
            title="Campuses & Practical Facilities"
            subtitle="Explore our nursing skill labs, paramedical practical setups, and modern lecture halls."
          />

          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#F26A21] text-white shadow-md shadow-orange-500/20'
                    : 'bg-[#FAFAF8] text-[#667085] hover:bg-[#E3E6E5] border border-[#E3E6E5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="p-16 text-center">
              <Loader2 className="w-10 h-10 text-[#F26A21] animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium text-[#667085]">Loading photos from R2 storage...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-12 text-center bg-[#FAFAF8] rounded-2xl border border-[#E3E6E5] max-w-md mx-auto">
              <p className="text-sm font-bold text-[#202426]">No photos found in this category.</p>
            </div>
          ) : (
            <motion.div
              variants={staggeredContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={softPopUpVariant}
                  onClick={() => setLightboxImage(item)}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-[#E3E6E5] shadow-xs hover:shadow-xl transition-all duration-300">
                    <ImagePlaceholder
                      label={item.title}
                      imageUrl={item.image_url}
                      aspectRatio="4:3"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-5 text-white">
                      <span className="self-start text-[10px] font-extrabold uppercase bg-[#F26A21] px-2.5 py-1 rounded-full shadow-xs">
                        {item.category}
                      </span>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold">{item.title}</p>
                          <p className="text-xs text-slate-200 line-clamp-1">{item.caption}</p>
                        </div>
                        <ZoomIn className="w-5 h-5 text-white shrink-0 ml-2" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>

      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-900/60 hover:bg-slate-900 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[75vh] bg-black flex items-center justify-center">
                <img
                  src={lightboxImage.image_url}
                  alt={lightboxImage.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="p-6 bg-white space-y-1">
                <span className="text-[11px] font-extrabold uppercase text-[#F26A21]">
                  {lightboxImage.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{lightboxImage.title}</h3>
                <p className="text-sm text-slate-600">{lightboxImage.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageShell>
  );
};
