import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const KEY = 'alitech_theme';
const current = () => document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

/** Sun/moon button in the header. Remembers the visitor's choice on their device. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(current);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#FFFFFF' : '#0A0A0A');
    try { localStorage.setItem(KEY, theme); } catch { /* private mode */ }
  }, [theme]);

  const next = theme === 'light' ? 'dark' : 'light';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
      <span className="theme-toggle-label">{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
    </button>
  );
}
