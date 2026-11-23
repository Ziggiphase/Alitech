import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ title, onClose, children, footer }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="adm-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="adm-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="adm-modal-head">
          <h2>{title}</h2>
          <button className="adm-icon-btn" onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>
        <div className="adm-modal-body">{children}</div>
        {footer && <div className="adm-modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

/** Labelled form field wrapper */
// `group` = several controls inside (photos, specs) → a <div> so taps don't jump to the first input
export function Field({ label, hint, required, children, wide, group }) {
  const Tag = group ? 'div' : 'label';
  return (
    <Tag className={`adm-field ${wide ? 'adm-field--wide' : ''}`} {...(group ? { role: 'group', 'aria-label': label } : {})}>
      <span className="adm-label">{label}{required && <em> *</em>}</span>
      {children}
      {hint && <span className="adm-hint">{hint}</span>}
    </Tag>
  );
}
