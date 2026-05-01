import { CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Notification.css';

export default function Notification() {
  const { notification } = useCart();
  if (!notification) return null;

  const icons = { success: CheckCircle, info: Info, warning: AlertTriangle };
  const Icon = icons[notification.type] || CheckCircle;

  return (
    <div className={`notification notification--${notification.type} animate-fadeInUp`}>
      <Icon size={18} />
      <span>{notification.message}</span>
    </div>
  );
}
