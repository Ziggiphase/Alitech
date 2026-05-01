// Alitech product catalog data
export const categories = [
  { id: 'phones', name: 'Phones', icon: 'Smartphone', description: 'Latest smartphones from top brands' },
  { id: 'laptops', name: 'Laptops', icon: 'Laptop', description: 'Powerful laptops for work & play' },
  { id: 'tablets', name: 'Tablets', icon: 'Tablet', description: 'Versatile tablets for every need' },
  { id: 'smartwatches', name: 'Smartwatches', icon: 'Watch', description: 'Stay connected on your wrist' },
  { id: 'consoles', name: 'Game Consoles', icon: 'Gamepad2', description: 'Next-gen gaming experiences' },
  { id: 'audio', name: 'Audio', icon: 'Headphones', description: 'Premium sound quality' },
  { id: 'accessories', name: 'Accessories', icon: 'Cable', description: 'Essential tech accessories' },
];

export const brands = [
  { id: 'apple', name: 'Apple', logo: '🍎' },
  { id: 'samsung', name: 'Samsung', logo: '📱' },
  { id: 'google', name: 'Google', logo: '🔍' },
  { id: 'sony', name: 'Sony', logo: '🎮' },
  { id: 'hp', name: 'HP', logo: '💻' },
  { id: 'dell', name: 'Dell', logo: '🖥️' },
  { id: 'lenovo', name: 'Lenovo', logo: '⌨️' },
  { id: 'xiaomi', name: 'Xiaomi', logo: '📲' },
  { id: 'tecno', name: 'Tecno', logo: '📞' },
  { id: 'infinix', name: 'Infinix', logo: '🔋' },
  { id: 'asus', name: 'Asus', logo: '🎯' },
  { id: 'microsoft', name: 'Microsoft', logo: '🪟' },
  { id: 'nintendo', name: 'Nintendo', logo: '🕹️' },
  { id: 'jbl', name: 'JBL', logo: '🔊' },
];

export const products = [
  // PHONES
  {
    id: 1, name: 'iPhone 16 Pro Max', brand: 'apple', category: 'phones',
    price: 1199, originalPrice: 1299, rating: 4.9, reviews: 342, inStock: true,
    condition: 'new', badge: 'Hot Deal',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    specs: { display: '6.9" Super Retina XDR', chip: 'A18 Pro', camera: '48MP Triple', battery: '4685 mAh', storage: '256GB', ram: '8GB' },
    description: 'The most advanced iPhone ever with titanium design and the powerful A18 Pro chip.',
    colors: ['Natural Titanium', 'Black Titanium', 'White Titanium', 'Desert Titanium'],
  },
  {
    id: 2, name: 'Samsung Galaxy S25 Ultra', brand: 'samsung', category: 'phones',
    price: 1099, originalPrice: 1299, rating: 4.8, reviews: 289, inStock: true,
    condition: 'new', badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
    specs: { display: '6.8" Dynamic AMOLED', chip: 'Snapdragon 8 Elite', camera: '200MP Quad', battery: '5000 mAh', storage: '256GB', ram: '12GB' },
    description: 'Galaxy AI puts the power of artificial intelligence in your hands with the new Galaxy S25 Ultra.',
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Blue', 'Titanium Silver'],
  },
  {
    id: 3, name: 'Google Pixel 9 Pro', brand: 'google', category: 'phones',
    price: 899, originalPrice: 999, rating: 4.7, reviews: 198, inStock: true,
    condition: 'new', badge: 'AI Powered',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    specs: { display: '6.3" Super Actua', chip: 'Tensor G4', camera: '50MP Triple', battery: '4700 mAh', storage: '128GB', ram: '16GB' },
    description: 'The best of Google AI and the most advanced Pixel camera yet.',
    colors: ['Obsidian', 'Porcelain', 'Hazel', 'Rose Quartz'],
  },
  {
    id: 4, name: 'Tecno Camon 30 Pro', brand: 'tecno', category: 'phones',
    price: 349, originalPrice: 399, rating: 4.3, reviews: 156, inStock: true,
    condition: 'new', badge: 'Value Pick',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    specs: { display: '6.78" AMOLED', chip: 'MediaTek Dimensity 8020', camera: '50MP Dual', battery: '5000 mAh', storage: '256GB', ram: '8GB' },
    description: 'Professional-grade camera performance at an accessible price point.',
    colors: ['Basaltic Dark', 'Lava Grey'],
  },
  {
    id: 5, name: 'Xiaomi Redmi Note 14 Pro+', brand: 'xiaomi', category: 'phones',
    price: 279, originalPrice: 329, rating: 4.5, reviews: 412, inStock: true,
    condition: 'new', badge: null,
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop',
    specs: { display: '6.67" AMOLED 120Hz', chip: 'MediaTek Dimensity 7300', camera: '200MP Triple', battery: '5110 mAh', storage: '256GB', ram: '8GB' },
    description: 'Incredible 200MP camera at an unbelievable price. The best mid-range champion.',
    colors: ['Midnight Black', 'Phantom Purple', 'Ice Blue'],
  },
  {
    id: 6, name: 'Infinix Note 40 Pro+', brand: 'infinix', category: 'phones',
    price: 259, originalPrice: null, rating: 4.2, reviews: 87, inStock: true,
    condition: 'new', badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
    specs: { display: '6.78" AMOLED', chip: 'MediaTek Dimensity 7020', camera: '108MP Triple', battery: '4600 mAh', storage: '256GB', ram: '8GB' },
    description: 'Wireless MagCharge + 100W fast charging in a sleek, premium body.',
    colors: ['Obsidian Black', 'Vintage Green'],
  },

  // LAPTOPS
  {
    id: 7, name: 'MacBook Pro 16" M4 Max', brand: 'apple', category: 'laptops',
    price: 2499, originalPrice: 2799, rating: 4.9, reviews: 201, inStock: true,
    condition: 'new', badge: 'Pro Choice',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    specs: { display: '16.2" Liquid Retina XDR', chip: 'Apple M4 Max', camera: '1080p FaceTime', battery: '22 hours', storage: '1TB SSD', ram: '48GB' },
    description: 'Unprecedented power for the most demanding workflows.',
    colors: ['Space Black', 'Silver'],
  },
  {
    id: 8, name: 'Dell XPS 15', brand: 'dell', category: 'laptops',
    price: 1399, originalPrice: 1599, rating: 4.6, reviews: 178, inStock: true,
    condition: 'new', badge: null,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop',
    specs: { display: '15.6" OLED 3.5K', chip: 'Intel Core Ultra 9', camera: '720p HD', battery: '13 hours', storage: '1TB SSD', ram: '32GB' },
    description: 'Stunning OLED display in a compact, powerful design.',
    colors: ['Platinum Silver', 'Graphite'],
  },
  {
    id: 9, name: 'HP Spectre x360', brand: 'hp', category: 'laptops',
    price: 1249, originalPrice: null, rating: 4.5, reviews: 134, inStock: true,
    condition: 'new', badge: '2-in-1',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    specs: { display: '14" 2.8K OLED Touch', chip: 'Intel Core Ultra 7', camera: '5MP IR', battery: '17 hours', storage: '1TB SSD', ram: '16GB' },
    description: 'The ultimate 2-in-1 convertible with a stunning OLED display.',
    colors: ['Nightfall Black', 'Pale Brass'],
  },
  {
    id: 10, name: 'Lenovo ThinkPad X1 Carbon', brand: 'lenovo', category: 'laptops',
    price: 1549, originalPrice: 1749, rating: 4.7, reviews: 246, inStock: true,
    condition: 'new', badge: 'Business',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
    specs: { display: '14" 2.8K OLED', chip: 'Intel Core Ultra 7', camera: '1080p MIPI', battery: '15 hours', storage: '512GB SSD', ram: '32GB' },
    description: 'The gold standard for business ultrabooks. Legendary reliability.',
    colors: ['Black'],
  },
  {
    id: 11, name: 'ASUS ROG Strix G16', brand: 'asus', category: 'laptops',
    price: 1699, originalPrice: 1899, rating: 4.6, reviews: 89, inStock: true,
    condition: 'new', badge: 'Gaming',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
    specs: { display: '16" QHD 240Hz', chip: 'Intel Core i9-14900HX', camera: 'None', battery: '90Wh', storage: '1TB SSD', ram: '32GB' },
    description: 'Dominate every game with RTX 4070 graphics and blazing-fast display.',
    colors: ['Eclipse Gray', 'Volt Green'],
  },

  // TABLETS
  {
    id: 12, name: 'iPad Pro M4 13"', brand: 'apple', category: 'tablets',
    price: 1299, originalPrice: 1399, rating: 4.9, reviews: 167, inStock: true,
    condition: 'new', badge: 'Ultra Thin',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    specs: { display: '13" Ultra Retina XDR', chip: 'Apple M4', camera: '12MP Wide', battery: '10 hours', storage: '256GB', ram: '8GB' },
    description: 'The thinnest Apple product ever. Impossibly powerful.',
    colors: ['Space Black', 'Silver'],
  },
  {
    id: 13, name: 'Samsung Galaxy Tab S10 Ultra', brand: 'samsung', category: 'tablets',
    price: 1099, originalPrice: 1199, rating: 4.7, reviews: 132, inStock: true,
    condition: 'new', badge: null,
    image: 'https://images.unsplash.com/photo-1561154464-82e9aab73fb2?w=400&h=400&fit=crop',
    specs: { display: '14.6" Dynamic AMOLED', chip: 'MediaTek Dimensity 9300+', camera: '13MP Dual', battery: '11200 mAh', storage: '256GB', ram: '12GB' },
    description: 'The biggest, most immersive Galaxy Tab experience with S Pen included.',
    colors: ['Moonstone Gray', 'Graphite'],
  },

  // SMARTWATCHES
  {
    id: 14, name: 'Apple Watch Ultra 2', brand: 'apple', category: 'smartwatches',
    price: 799, originalPrice: 849, rating: 4.8, reviews: 298, inStock: true,
    condition: 'new', badge: 'Adventure',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
    specs: { display: '49mm Always-On', chip: 'S9 SiP', camera: 'N/A', battery: '36 hours', storage: '64GB', ram: '1GB' },
    description: 'The most rugged and capable Apple Watch. Built for adventure.',
    colors: ['Natural Titanium'],
  },
  {
    id: 15, name: 'Samsung Galaxy Watch 7', brand: 'samsung', category: 'smartwatches',
    price: 329, originalPrice: 379, rating: 4.5, reviews: 176, inStock: true,
    condition: 'new', badge: 'Health+',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
    specs: { display: '1.5" Super AMOLED', chip: 'Exynos W1000', camera: 'N/A', battery: '40 hours', storage: '32GB', ram: '2GB' },
    description: 'Advanced health monitoring with Galaxy AI integration.',
    colors: ['Green', 'Silver', 'Cream'],
  },

  // CONSOLES
  {
    id: 16, name: 'PlayStation 5 Pro', brand: 'sony', category: 'consoles',
    price: 699, originalPrice: null, rating: 4.8, reviews: 523, inStock: true,
    condition: 'new', badge: 'Next Gen',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
    specs: { display: '8K HDR', chip: 'Custom AMD Zen 2', camera: 'HD Camera', battery: 'N/A', storage: '2TB SSD', ram: '16GB GDDR6' },
    description: 'The ultimate gaming experience with ray tracing and 8K support.',
    colors: ['White/Black'],
  },
  {
    id: 17, name: 'Nintendo Switch 2', brand: 'nintendo', category: 'consoles',
    price: 449, originalPrice: null, rating: 4.7, reviews: 312, inStock: false,
    condition: 'new', badge: 'Pre-Order',
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop',
    specs: { display: '8" LCD 120Hz', chip: 'Custom Nvidia', camera: 'N/A', battery: '4-6 hours', storage: '256GB', ram: '12GB' },
    description: 'Play at home or on the go. The next generation of hybrid gaming.',
    colors: ['Black/Blue-Red'],
  },

  // AUDIO
  {
    id: 18, name: 'AirPods Pro 3', brand: 'apple', category: 'audio',
    price: 249, originalPrice: 279, rating: 4.8, reviews: 456, inStock: true,
    condition: 'new', badge: null,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop',
    specs: { display: 'N/A', chip: 'H3', camera: 'N/A', battery: '6 hours', storage: 'N/A', ram: 'N/A' },
    description: 'Adaptive Audio with revolutionary hearing health features.',
    colors: ['White'],
  },
  {
    id: 19, name: 'Sony WH-1000XM6', brand: 'sony', category: 'audio',
    price: 349, originalPrice: 399, rating: 4.9, reviews: 378, inStock: true,
    condition: 'new', badge: 'Editor\'s Pick',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    specs: { display: 'N/A', chip: 'V2 Processor', camera: 'N/A', battery: '40 hours', storage: 'N/A', ram: 'N/A' },
    description: 'Industry-leading noise cancellation. Unparalleled sound quality.',
    colors: ['Black', 'Midnight Blue', 'Silver'],
  },
];

export const testimonials = [
  { id: 1, name: 'Adebayo K.', role: 'Tech Enthusiast', text: 'Alitech gave me the best deal on my iPhone 16 Pro. Genuine products and fantastic service!', rating: 5 },
  { id: 2, name: 'Sandra O.', role: 'Business Owner', text: 'I bought 5 laptops for my office. Fast delivery, competitive prices, and excellent after-sales support.', rating: 5 },
  { id: 3, name: 'James M.', role: 'Gamer', text: 'Got my PS5 Pro here. They even helped me set it up. These guys know their stuff!', rating: 5 },
  { id: 4, name: 'Fatima B.', role: 'Student', text: 'The trade-in program was so smooth. Got a great value for my old phone and upgraded to Galaxy S25.', rating: 4 },
];

export const heroSlides = [
  {
    title: 'iPhone 16 Pro Max',
    subtitle: 'Titanium. So Strong. So Light. So Pro.',
    cta: 'Shop Now',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    productId: 1,
  },
  {
    title: 'Galaxy S25 Ultra',
    subtitle: 'The Next Level of Galaxy AI. Unfold Your World.',
    cta: 'Explore',
    bg: 'linear-gradient(135deg, #1a1a1a 0%, #2d1b69 50%, #11001c 100%)',
    productId: 2,
  },
  {
    title: 'MacBook Pro M4',
    subtitle: 'Mind-Blowing. Head-Turning.',
    cta: 'Discover',
    bg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0d0d1a 100%)',
    productId: 7,
  },
  {
    title: 'Flash Deals 🔥',
    subtitle: 'Up to 40% off selected devices. Limited time only.',
    cta: 'View Deals',
    bg: 'linear-gradient(135deg, #1a0a00 0%, #3d1500 50%, #1a0a00 100%)',
    productId: null,
  },
];

export const repairServices = [
  { id: 1, name: 'Screen Replacement', icon: 'Smartphone', price: 'From ₦15,000', time: '1-2 hours' },
  { id: 2, name: 'Battery Replacement', icon: 'BatteryCharging', price: 'From ₦8,000', time: '30-60 mins' },
  { id: 3, name: 'Water Damage Repair', icon: 'Droplets', price: 'From ₦12,000', time: '2-4 hours' },
  { id: 4, name: 'Charging Port Fix', icon: 'PlugZap', price: 'From ₦5,000', time: '1 hour' },
  { id: 5, name: 'Software Issues', icon: 'Settings', price: 'From ₦3,000', time: '30 mins' },
  { id: 6, name: 'Laptop Repair', icon: 'Laptop', price: 'From ₦20,000', time: '1-3 days' },
];
