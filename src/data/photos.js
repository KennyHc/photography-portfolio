// 1. Import the images at the top
import food1 from '../assets/coffee_food.jpg'; // Adjust filenames to match yours
import scene1 from '../assets/fireworks.jpg';
import event1 from '../assets/fireworks_wedding.jpg';
import urban1 from '../assets/gz_night.jpg';
import food2 from '../assets/matcha_cookie.jpg';
import urban2 from '../assets/umbrella.jpg';
import arc1 from '../assets/basilica.jpg';
import nat1 from '../assets/trees.jpg';

export const photos = [
  { 
    id: 1, 
    category: 'Food', 
    src: food1, // <--- Use the imported variable
    title: 'Coffee' 
  },
  { 
    id: 2, 
    category: 'Event', 
    src: event1, 
    title: 'Wedding Fireworks' 
  },
  { 
    id: 3, 
    category: 'Scenes', 
    src: scene1, 
    title: 'Fireworks' 
  },
  { 
    id: 4, 
    category: 'Urban', 
    src: urban1, 
    title: 'Guangzhou Night' 
  },
  { 
    id: 5, 
    category: 'Food', 
    src: food2,
    title: 'Matcha' 
  },
  { 
    id: 6, 
    category: 'Urban', 
    src: urban2,
    title: 'Rainy Day' 
  },
  { 
    id: 7, 
    category: 'Architecture', 
    src: arc1,
    title: 'Basílica' 
  },
  { 
    id: 8, 
    category: 'Nature', 
    src: nat1,
    title: 'Behind the Trees' 
  },
];


export const categories = ['All', 'Nature', 'Urban', 'Portraits','Food','Scenes','Architecture'];