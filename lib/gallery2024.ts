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
    src: '/images/2024/IMG_0207.jpg',
    alt: 'White Elephant Party 2024 - Photo 1'
  },
  {
    id: '2',
    type: 'image',
    src: '/images/2024/IMG_0208.jpg',
    alt: 'White Elephant Party 2024 - Photo 2'
  },
  {
    id: '3',
    type: 'video',
    src: '/videos/2024/IMG_0209.mp4',
    thumbnail: '/images/2024/IMG_0207.jpg',
    alt: 'Party video 1'
  },
  {
    id: '4',
    type: 'video',
    src: '/videos/2024/IMG_0210.mp4',
    thumbnail: '/images/2024/IMG_0208.jpg',
    alt: 'Party video 2'
  },
  {
    id: '5',
    type: 'image',
    src: '/images/2024/IMG_0211.jpeg',
    alt: 'White Elephant Party 2024 - Photo 3'
  },
  {
    id: '6',
    type: 'video',
    src: '/videos/2024/IMG_0212.mp4',
    thumbnail: '/images/2024/IMG_0211.jpeg',
    alt: 'Party video 3'
  },
  {
    id: '7',
    type: 'image',
    src: '/images/2024/IMG_0213.jpg',
    alt: 'White Elephant Party 2024 - Photo 4'
  },
  {
    id: '8',
    type: 'video',
    src: '/videos/2024/IMG_0215.mp4',
    thumbnail: '/images/2024/IMG_0213.jpg',
    alt: 'Party video 4'
  },
  {
    id: '9',
    type: 'image',
    src: '/images/2024/IMG_0216.jpg',
    alt: 'White Elephant Party 2024 - Photo 5'
  },
  {
    id: '10',
    type: 'image',
    src: '/images/2024/IMG_0506.jpg',
    alt: 'White Elephant Party 2024 - Photo 6'
  },
];
