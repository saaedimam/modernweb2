import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Filter } from 'lucide-react';
import Section from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { trackPageView, trackEvent } from '@/lib/analytics';

const categories = [
  { key: 'all', label: 'All Images' },
  { key: 'factory', label: 'Factory' },
  { key: 'products', label: 'Products' },
  { key: 'office', label: 'Office' },
  { key: 'sustainability', label: 'Sustainability' },
];

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    alt: 'Futuristic textile factory main production floor',
    category: 'factory',
    featured: true,
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'Modern textile weaving machines',
    category: 'factory',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'High-tech quality control station',
    category: 'factory',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'Automated textile machinery',
    category: 'factory',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    alt: 'Modern office space with design team',
    category: 'office',
    featured: true,
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'Executive boardroom',
    category: 'office',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'Design studio workspace',
    category: 'office',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'Premium cotton fabric close-up',
    category: 'products',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'Silk fabric texture detail',
    category: 'products',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'Sustainable eco fabric',
    category: 'products',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'Technical performance fabric',
    category: 'products',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'Solar panel installation on factory roof',
    category: 'sustainability',
  },
];

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  featured?: boolean;
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(galleryImages);

  useEffect(() => {
    trackPageView('/gallery');
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    trackEvent('gallery_image_view', { image_id: image.id, category: image.category });
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    trackEvent('gallery_filter', { category });
  };

  const getGridClassName = (image: GalleryImage, index: number) => {
    // Create masonry-like layout with featured images taking more space
    if (image.featured) {
      return 'md:col-span-2 lg:row-span-2';
    }
    return '';
  };

  return (
    <div className="pt-20" data-testid="gallery-page">
      {/* Hero Section */}
      <Section>
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Visual <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">Gallery</span>
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our state-of-the-art facilities, premium fabric collections, and the craftsmanship that defines our commitment to excellence.
          </motion.p>
        </div>
      </Section>

      {/* Gallery Filter */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Filter className="w-5 h-5 text-muted-foreground mr-3" />
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? 'default' : 'outline'}
                  onClick={() => handleCategoryFilter(category.key)}
                  className={selectedCategory === category.key 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'glass hover:bg-primary/10'
                  }
                  data-testid={`filter-${category.key}`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className={`relative group cursor-pointer ${getGridClassName(image, index)}`}
                  onClick={() => handleImageClick(image)}
                  data-testid={`gallery-image-${image.id}`}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover-lift">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-300 ${
                        image.featured ? 'h-full min-h-96' : 'h-48'
                      }`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-sm font-medium">{image.alt}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              data-testid="gallery-empty-state"
            >
              <div className="text-6xl mb-4">🖼️</div>
              <h3 className="text-2xl font-semibold mb-2">No images found</h3>
              <p className="text-muted-foreground mb-4">
                Try selecting a different category to view more images.
              </p>
              <Button onClick={() => handleCategoryFilter('all')}>
                View All Images
              </Button>
            </motion.div>
          )}

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-view-full-gallery"
            >
              View Full Gallery
            </Button>
          </div>
        </div>
      </Section>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-0" data-testid="image-lightbox">
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                data-testid="button-close-lightbox"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <h3 className="text-white text-lg font-semibold mb-2">{selectedImage.alt}</h3>
                <p className="text-white/80 text-sm capitalize">Category: {selectedImage.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
