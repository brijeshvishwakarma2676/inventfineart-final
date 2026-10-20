import { whatsappIcon } from '../data/art';
import { whatsappLink } from '../data/site';

/** Floating WhatsApp button on every page. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink('Hello Invent Fine Art, I have an enquiry.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-110"
    >
      <svg viewBox={whatsappIcon.viewBox} className="h-7 w-7" fill="currentColor" aria-hidden="true" dangerouslySetInnerHTML={{ __html: whatsappIcon.svg }} />
    </a>
  );
}
