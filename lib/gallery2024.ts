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
    thumbnail: '/images/2024/party-1.jpg',
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
  {
    id: '12',
    type: 'image',
    src: '/images/2024/IMG_0207.jpg',
    alt: 'White Elephant Party 2024 - Photo 7'
  },
  {
    id: '13',
    type: 'image',
    src: '/images/2024/IMG_0208.jpg',
    alt: 'White Elephant Party 2024 - Photo 8'
  },
  {
    id: '14',
    type: 'video',
    src: '/videos/2024/IMG_0209.mp4',
    thumbnail: '/images/2024/IMG_0207.jpg',
    alt: 'Party video 6'
  },
  {
    id: '15',
    type: 'video',
    src: '/videos/2024/IMG_0210.mp4',
    thumbnail: '/images/2024/IMG_0208.jpg',
    alt: 'Party video 7'
  },
  {
    id: '16',
    type: 'image',
    src: '/images/2024/IMG_0211.jpeg',
    alt: 'White Elephant Party 2024 - Photo 9'
  },
  {
    id: '17',
    type: 'video',
    src: '/videos/2024/IMG_0212.mp4',
    thumbnail: '/images/2024/IMG_0211.jpeg',
    alt: 'Party video 8'
  },
  {
    id: '18',
    type: 'image',
    src: '/images/2024/IMG_0213.jpg',
    alt: 'White Elephant Party 2024 - Photo 10'
  },
  {
    id: '19',
    type: 'video',
    src: '/videos/2024/IMG_0215.mp4',
    thumbnail: '/images/2024/IMG_0213.jpg',
    alt: 'Party video 9'
  },
  {
    id: '20',
    type: 'image',
    src: '/images/2024/IMG_0216.jpg',
    alt: 'White Elephant Party 2024 - Photo 11'
  },
  {
    id: '21',
    type: 'image',
    src: '/images/2024/IMG_0506.jpg',
    alt: 'White Elephant Party 2024 - Photo 12'
  },
];
