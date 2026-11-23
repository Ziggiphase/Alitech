import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../../config/site';
import './FloatingWhatsApp.css';

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink('Hello Alitech, I have a question.')}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={26} />
      <span className="floating-whatsapp-label">Chat with us</span>
    </a>
  );
}
