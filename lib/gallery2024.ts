export type GalleryItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  alt: string;
};

// 2024 Gallery items - update these with your actual images/videos
export const gallery2024: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    src: '/images/2024/party-1.jpg',
    alt: 'Group photo at White Elephant Party 2024'
  },
  {
    id: '2',
    type: 'image',
    src: '/images/2024/party-2.jpg',
    alt: 'Gift stealing moment'
  },
  {
    id: '3',
    type: 'image',
    src: '/images/2024/party-3.jpg',
    alt: 'Ugly sweater contest winners'
  },
  {
    id: '4',
    type: 'video',
    src: '/videos/2024/highlights.mp4',
    thumbnail: '/images/2024/video-thumb-1.jpg',
    alt: 'Party highlights video'
  },
  {
    id: '5',
    type: 'image',
    src: '/images/2024/party-4.jpg',
    alt: 'The most fought-over gift'
  },
  {
    id: '6',
    type: 'image',
    src: '/images/2024/party-5.jpg',
    alt: 'Hot cocoa station'
  },
  // Add more gallery items as needed
  // For now, these are placeholder paths
  // Replace with actual images/videos in the public folder
];
