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

// Product conditions
export const conditions = [
  { id: 'new', name: 'Brand New' },
  { id: 'uk-used', name: 'UK Used' },
  { id: 'refurbished', name: 'Refurbished' },
];
export const grades = [
  { id: 'A', name: 'Grade A — like new' },
  { id: 'B', name: 'Grade B — light marks' },
  { id: 'C', name: 'Grade C — visible wear' },
];

export const conditionLabel = (id) => conditions.find(c => c.id === id)?.name || id || '';

// ─── Products ───────────────────────────────────────────────
// Products are added from the admin dashboard (/admin) and stored in Firebase.
// This tidies one raw listing into the shape the shop pages expect.
export function normalizeProduct(data) {
  const images = [].concat(data.images || []).filter(Boolean);
  return {
    inStock: true,
    description: '',
    ...data,
    specs: data.specs && typeof data.specs === 'object' ? data.specs : {},
    colors: Array.isArray(data.colors) ? data.colors : [],
    price: Number(data.price) || 0,
    originalPrice: Number(data.originalPrice) > Number(data.price) ? Number(data.originalPrice) : null,
    images,
    image: images[0] || '/brand/alitech-mark.webp',
  };
}

export const normalizeProducts = (list = []) =>
  list
    .filter(p => p && p.id && !p.hidden)
    .map(normalizeProduct)
    .sort((a, b) => new Date(b.added || 0) - new Date(a.added || 0)); // newest first

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
    productId: 'iphone-16-pro-max',
  },
  {
    title: 'Galaxy S25 Ultra',
    subtitle: 'The Next Level of Galaxy AI. Unfold Your World.',
    cta: 'Explore',
    bg: 'linear-gradient(135deg, #1a1a1a 0%, #2d1b69 50%, #11001c 100%)',
    productId: 'samsung-galaxy-s25-ultra',
  },
  {
    title: 'MacBook Pro M4',
    subtitle: 'Mind-Blowing. Head-Turning.',
    cta: 'Discover',
    bg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0d0d1a 100%)',
    productId: 'macbook-pro-16-m4-max',
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
