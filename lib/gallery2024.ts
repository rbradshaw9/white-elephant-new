export type GalleryItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  alt: string;
};

// 2024 Gallery items - Your actual party photos and videos!
export const gallery2024: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    src: '/images/2024/party-1.jpg',
    alt: 'White Elephant Party 2024 - Photo 1'
  },
  {
    id: '2',
    type: 'image',
    src: '/images/2024/party-2.jpg',
    alt: 'White Elephant Party 2024 - Photo 2'
  },
  {
    id: '3',
    type: 'video',
    src: '/videos/2024/video-1.mp4',
    thumbnail: '/images/2024/party-1.jpg', // Using first image as thumbnail
    alt: 'Party video 1'
  },
  {
    id: '4',
    type: 'image',
    src: '/images/2024/party-3.jpg',
    alt: 'White Elephant Party 2024 - Photo 3'
  },
  {
    id: '5',
    type: 'video',
    src: '/videos/2024/video-2.mp4',
    thumbnail: '/images/2024/party-2.jpg',
    alt: 'Party video 2'
  },
  {
    id: '6',
    type: 'image',
    src: '/images/2024/party-4.jpg',
    alt: 'White Elephant Party 2024 - Photo 4'
  },
  {
    id: '7',
    type: 'video',
    src: '/videos/2024/video-3.mp4',
    thumbnail: '/images/2024/party-3.jpg',
    alt: 'Party video 3'
  },
  {
    id: '8',
    type: 'image',
    src: '/images/2024/party-5.jpg',
    alt: 'White Elephant Party 2024 - Photo 5'
  },
  {
    id: '9',
    type: 'video',
    src: '/videos/2024/video-4.mp4',
    thumbnail: '/images/2024/party-4.jpg',
    alt: 'Party video 4'
  },
  {
    id: '10',
    type: 'image',
    src: '/images/2024/party-6.jpg',
    alt: 'White Elephant Party 2024 - Photo 6'
  },
  {
    id: '11',
    type: 'video',
    src: '/videos/2024/video-5.mp4',
    thumbnail: '/images/2024/party-5.jpg',
    alt: 'Party video 5'
  },
];
