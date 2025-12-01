export type GalleryItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  alt: string;
};

// 2024 Gallery items - Using placeholder images for now
export const gallery2024: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    src: 'https://placehold.co/800x600/dc2626/ffffff?text=Party+Photo+1',
    alt: 'Group photo at White Elephant Party 2024'
  },
  {
    id: '2',
    type: 'image',
    src: 'https://placehold.co/800x600/15803d/ffffff?text=Gift+Stealing',
    alt: 'Gift stealing moment'
  },
  {
    id: '3',
    type: 'image',
    src: 'https://placehold.co/800x600/dc2626/ffffff?text=Ugly+Sweaters',
    alt: 'Ugly sweater contest winners'
  },
  {
    id: '4',
    type: 'image',
    src: 'https://placehold.co/800x600/15803d/ffffff?text=Video+Placeholder',
    alt: 'Party highlights video'
  },
  {
    id: '5',
    type: 'image',
    src: 'https://placehold.co/800x600/dc2626/ffffff?text=Popular+Gift',
    alt: 'The most fought-over gift'
  },
  {
    id: '6',
    type: 'image',
    src: 'https://placehold.co/800x600/15803d/ffffff?text=Hot+Cocoa',
    alt: 'Hot cocoa station'
  },
  // To use your own images:
  // 1. Upload images to /public/images/2024/
  // 2. Replace src with: '/images/2024/your-image.jpg'
  // For videos: type: 'video', src: '/videos/2024/video.mp4', thumbnail: '/images/2024/thumb.jpg'
];
