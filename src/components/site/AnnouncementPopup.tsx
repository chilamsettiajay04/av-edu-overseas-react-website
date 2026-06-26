import { Link } from "react-router-dom";

interface AnnouncementPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function AnnouncementPopup({
  open,
  onOpenChange,
  message,
  image,
  ctaText,
  ctaLink,
}: AnnouncementPopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4 md:items-end md:justify-end md:p-8">
      <div className="pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-w-md md:max-w-sm md:rounded-2xl">
        {/* decorative top panel */}
        <div
          className="relative h-28 bg-gradient-to-br from-primary via-primary/80 to-primary/60 sm:h-32 md:h-36"
          style={image ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
        >
          {image && <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/40 to-primary/60" />}
        </div>

        <div className="px-6 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-1 w-6 rounded-full bg-primary/40" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Announcement
            </span>
          </div>

          <h3 className="mt-3 font-serif text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl md:text-3xl">
            {message}
          </h3>

          {ctaText && ctaLink && (
            <div className="mt-6 flex items-center gap-3">
              <Link
                to={ctaLink}
                onClick={() => onOpenChange(false)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 md:px-6 md:text-[11px]"
              >
                {ctaText}
              </Link>
              <button
                onClick={() => onOpenChange(false)}
                className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/60 transition-colors hover:text-muted-foreground"
              >
                Maybe Later
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
