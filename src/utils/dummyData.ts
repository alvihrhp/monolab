import type { GalleryItem } from '../types';
import { generateSlug } from './slugUtils';

export const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'Amoghapasa',
    slug: generateSlug('1', 'Amoghapasa'),
    description: 'Amoghapasa adalah salah satu manifestasi dari Bodhisattva Avalokiteshvara dalam tradisi Buddha Mahayana. Arca ini menggambarkan sosok yang penuh dengan welas asih dan kebijaksanaan, dengan berbagai atribut simbolis yang mencerminkan kekuatan spiritual untuk membebaskan makhluk hidup dari penderitaan.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX_SYkQXg7VEoQtgcEycuilYY0Ve_NrRnorQ&s',
    category: 'Arkeologi',
    metadata: {
      'Pembuat': 'Kerajaan Singhasari',
      'Tahun Pembuatan': 'Abad 13-14 Masehi',
      'Bahasa': 'Sanskerta',
      'Bahan': 'Batu Andesit',
      'Jenis': 'Arkeologi',
      'Nomor Inventaris': '6469 (D198)',
      'Lembaga': 'Museum Nasional Indonesia',
    },
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Arca Bhairawa',
    slug: generateSlug('2', 'Arca Bhairawa'),
    description: 'Arca Bhairawa merupakan representasi dari aspek menakutkan dari Dewa Siwa dalam tradisi Hindu. Sosok ini digambarkan dengan ekspresi yang fierc dan atribut-atribut yang melambangkan kekuatan untuk menghancurkan kejahatan dan melindungi kebenaran. Bhairawa sering dipuja sebagai pelindung yang kuat.',
    imageUrl: 'https://travelinkmagz.com/wp-content/uploads/2020/04/JKT_Arca-Bhairawa_1920x1080px_2.jpg',
    category: 'Arkeologi',
    metadata: {
      'Tahun Pembuatan': 'Abad 13-14 Masehi',
      'Bahan': 'Batu',
      'Nomor Inventaris': '6470',
      'Lembaga': 'Museum Nasional Indonesia',
      'Dimensi': 'Tinggi 4,41 Meter dan Berat 4 Ton',
    },
    createdAt: new Date('2024-01-20'),
  }
]; 