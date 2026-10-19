export default function Logo({ className = 'h-10 w-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="16" className="fill-ink-900 dark:fill-white" />
      <path d="M14 46 28 16h8l14 30h-8l-3-7H25l-3 7z" className="fill-brand-500" />
      <path d="M27.5 33h9L32 23z" className="fill-ink-900 dark:fill-white" />
      <circle cx="48" cy="18" r="5" className="fill-violet-400" />
    </svg>
  );
}
