import { useState, useEffect, useCallback, useRef } from "react";
import {
  Phone, MapPin, Clock, Star, Wrench, Lightbulb, Droplets, Shield,
  Sparkles, Hammer, Truck, CheckCircle2, Instagram, Facebook,
  X, ChevronLeft, ChevronRight, Play, ChevronDown, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import logo from "@/assets/logo.png";
import farAfter from "@/assets/far-after.png";
import farProcess from "@/assets/far-process.png";
import golfAfter from "@/assets/golf-after.png";
import passatBefore from "@/assets/passat-before.png";
import passatAfter from "@/assets/passat-after.png";
import drlBefore from "@/assets/drl-before.png";
import drlAfter from "@/assets/drl-after.png";
import workshop from "@/assets/workshop.png";
import galleryAudiLed from "@/assets/gallery-audi-led.png";
import gallerySharan from "@/assets/gallery-sharan.png";
import golfVHalogen from "@/assets/golf-v-halogen.mp4";
import cakiVideo from "@/assets/caki-video.mp4";

const services = [
  { icon: Sparkles, title: "Zamena stakla fara", desc: "Napuklo ili oštećeno staklo zamenjujemo precizno i bez tragova." },
  { icon: Droplets, title: "Zaptivna masa", desc: "Profesionalna zamena zaptivne mase — kraj vlazi i kondenzaciji." },
  { icon: Wrench, title: "Dubinsko čišćenje", desc: "Iznutra i spolja — vraćamo punu providnost i sjaj." },
  { icon: Lightbulb, title: "LED i Xenon sijalice", desc: "Ugradnja visokokvalitetnih sijalica i DRL modula." },
  { icon: Hammer, title: "Reparacija projektora", desc: "Popravka projektora, senila i hromiranih elemenata." },
  { icon: Shield, title: "Varenje plastike", desc: "Isključivo varenje kućišta i nosača farova." },
];

const beforeAfter = [
  { before: passatBefore, after: passatAfter, label: "Passat — poliranje farova" },
  { before: drlBefore, after: drlAfter, label: "Audi — restauracija dnevnog svetla (DRL)" },
];

const socials = [
  { icon: Instagram, name: "@servis_farova_caki", url: "https://www.instagram.com/servis_farova_caki/", label: "Instagram" },
  { icon: Facebook, name: "Servis Farova Plastičar Čaki", url: "https://www.facebook.com/p/Servis-Farova-Plasticar-Caki-100057621812507/", label: "Facebook" },
];

const faqs = [
  {
    q: "Da li radite za celu Srbiju?",
    a: "Da! Primamo farove kurirskom službom iz cele Srbije — Beograd, Šabac, Valjevo, Novi Sad i sva ostala mesta. Pažljivo pakujemo i sigurno vraćamo farove na vašu adresu."
  },
  {
    q: "Kolika je garancija na poliranje farova?",
    a: "Dajemo garanciju od 3 godine na sve usluge poliranja, restauracije i zamene stakla farova."
  },
  {
    q: "Kako zakazati servis farova u Loznici?",
    a: "Pozovite nas na 062 1770679. Radimo isključivo uz prethodno zakazivanje, ponedeljak do subote od 8h."
  },
  {
    q: "Koje marke automobila servisiraju?",
    a: "Servisiramo farove svih marki — VW, Audi, BMW, Mercedes, Opel, Ford, Škoda, Renault, Toyota, Fiat i sve ostale marke."
  },
];

export default function Index() {
  const galleryItems: { type: "image" | "video"; src: string; poster?: string; alt: string }[] = [
    { type: "image", src: farAfter, alt: "Restauriran Audi LED far — servis farova Srbija" },
    { type: "image", src: farProcess, alt: "Proces poliranja fara Loznica" },
    { type: "image", src: golfAfter, alt: "Golf far posle restauracije — servis farova" },
    { type: "image", src: workshop, alt: "Naša radionica — servis farova Čaki Loznica" },
    { type: "image", src: galleryAudiLed, alt: "Audi LED far — detalj restauracije" },
    { type: "image", src: gallerySharan, alt: "VW Sharan u radionici — servis farova Loznica" },
    { type: "video", src: golfVHalogen, poster: golfAfter, alt: "Golf V — halogeni farovi (video)" },
  ];

  const testimonials = [
    { name: "Miloš Petrović", city: "Beograd", text: "Poslao sam oba fara kurirski iz Beograda. Za 3 dana vraćeni kao novi. Profesionalna usluga, preporučujem svima!", stars: 5 },
    { name: "Jovana Nikolić", city: "Novi Sad", text: "Imala sam problem sa kondenzacijom i polomljenim staklom. Čaki je sve rešio, far je savršen. Garancija 3 godine — to govori sve.", stars: 5 },
    { name: "Aleksandar Đorđević", city: "Šabac", text: "Sjajno iskustvo! Ugradili LED sijalice i očistili projektore. Vidi se ogromna razlika u svetlosti. 10/10!", stars: 5 },
    { name: "Maja Stanković", city: "Kragujevac", text: "Restaurirali su mi farove na Passat B7 — poliranje, zaptivna masa, sve urađeno precizno. Sjaj kao novi auto!", stars: 5 },
    { name: "Dragan Ilić", city: "Valjevo", text: "Blizu sam pa sam lično doneo. Primio me odmah, dijagnostika besplatna. Cena fer, kvalitet odličan. Vraćam se.", stars: 5 },
    { name: "Stefan Marković", city: "Niš", text: "Poslao kurirski, komunikacija odlična na svakom koraku. Farovi izgledaju bolje nego kad je auto bio nov!", stars: 5 },
  ];

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const statsTargets = [12, 4600, 3, 5];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i - 1 + galleryItems.length) % galleryItems.length)),
    [galleryItems.length]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i + 1) % galleryItems.length)),
    [galleryItems.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, prev, next]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounts(statsTargets.map((t) => Math.round(ease * t)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [statsVisible]);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "hsl(0 0% 6% / 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid hsl(0 0% 18%)" : "1px solid transparent",
        }}
      >
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <a href="#" className="flex items-center gap-3">
            <img src={logo} alt="Servis Farova Čaki logo" className="h-11 w-11 rounded-lg object-cover" />
            <div className="leading-tight">
              <div className="font-bold tracking-wide text-base" style={{ fontFamily: "Oswald, sans-serif" }}>SERVIS FAROVA</div>
              <div className="text-xs font-semibold tracking-[0.3em]" style={{ color: "hsl(0 82% 50%)" }}>ČAKI · LOZNICA</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[["#usluge", "Usluge"], ["#radovi", "Radovi"], ["#faq", "FAQ"], ["#kontakt", "Kontakt"]].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary hover:bg-red-grad hover:border-primary transition-all duration-200"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
            <Button
              asChild
              className="bg-red-grad hover:opacity-90 shadow-glow text-white font-semibold"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <a href="tel:0621770679">
                <Phone className="mr-2 h-4 w-4" />Pozovi
              </a>
            </Button>
            <button
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg border border-border bg-secondary"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Meni"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <span className="text-xs font-bold">≡</span>}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-4 flex flex-col gap-3">
            {[["#usluge", "Usluge"], ["#radovi", "Radovi"], ["#faq", "FAQ"], ["#kontakt", "Kontakt"]].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground py-2 border-b border-border last:border-0"
              >
                {label}
              </a>
            ))}
            <div className="flex gap-3 pt-1">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="h-9 w-9 flex items-center justify-center rounded-lg border border-border bg-secondary"
                  aria-label={s.label}>
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="bg-hero relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Red glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsl(0 82% 50% / 0.5) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, hsl(0 82% 50% / 0.4) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />
        </div>
        {/* Grain texture overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px 200px" }} />

        <div className="container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 text-xs font-semibold mb-6"
              style={{ background: "hsl(0 0% 14%)" }}>
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              4.635 Google recenzija · 5/5 — Broj 1 u Srbiji
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase leading-[0.92] mb-6"
              style={{ fontFamily: "Oswald, sans-serif" }}>
              <span className="block">Vraćamo <span className="text-primary">sjaj</span></span>
              <span className="block mt-2">Vašim farovima.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Profesionalan <strong className="text-foreground">servis farova u Loznici</strong> i za celu{" "}
              <strong className="text-foreground">Srbiju</strong> — poliranje, LED i Xenon ugradnja,
              zamena stakla i restauracija. Uz{" "}
              <span className="font-semibold text-foreground">3 godine garancije</span>.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-red-grad hover:opacity-90 shadow-glow text-base font-semibold text-white">
                <a href="tel:0621770679"><Phone className="mr-2 h-5 w-5" />062 1770679</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base border-border hover:border-primary hover:text-primary transition-colors">
                <a href="#radovi">Pogledaj radove</a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-5 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />Garancija 3 godine</div>
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" />Slanje kurirom — cela Srbija</div>
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" />Sigurno pakovanje</div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex items-center justify-center">
            {/* Big glow blob behind image */}
            <div className="pointer-events-none absolute inset-0 -m-8"
              style={{
                background: "radial-gradient(ellipse 80% 70% at 55% 50%, hsl(0 82% 45% / 0.35), transparent 70%)",
                filter: "blur(4px)",
              }} />
            {/* Floating ring decoration */}
            <div className="pointer-events-none absolute"
              style={{
                width: "110%", height: "110%",
                border: "1px solid hsl(0 82% 50% / 0.12)",
                borderRadius: "50% 40% 50% 40%",
                animation: "spin-slow 18s linear infinite",
              }} />
            <div className="pointer-events-none absolute"
              style={{
                width: "95%", height: "95%",
                border: "1px solid hsl(0 82% 50% / 0.07)",
                borderRadius: "40% 50% 40% 50%",
                animation: "spin-slow 24s linear infinite reverse",
              }} />

            <div className="relative w-full" style={{ animation: "hero-float 4s ease-in-out infinite" }}>
              <img
                src={farAfter}
                alt="Restauriran LED far — Servis Farova Čaki Loznica"
                className="rounded-2xl w-full object-cover shadow-card"
                style={{
                  aspectRatio: "4/3",
                  boxShadow: "0 0 0 1px hsl(0 82% 50% / 0.15), 0 25px 60px -10px hsl(0 0% 0% / 0.8), 0 0 80px -20px hsl(0 82% 50% / 0.4)",
                }}
              />
              {/* Red glow bottom edge */}
              <div className="pointer-events-none absolute -bottom-2 left-8 right-8 h-4 rounded-full"
                style={{ background: "hsl(0 82% 50% / 0.3)", filter: "blur(12px)" }} />

              {/* Shine overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)",
                }} />

              {/* Floating label top-right */}
              <div className="absolute top-3 right-3 bg-red-grad text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-glow">
                Posle restauracije
              </div>
            </div>

            {/* Stat card bottom-left */}
            <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 border border-border rounded-xl p-3 sm:p-4 shadow-card"
              style={{ background: "hsl(0 0% 9%)", backdropFilter: "blur(8px)" }}>
              <div className="text-2xl sm:text-3xl font-bold text-primary" style={{ fontFamily: "Oswald, sans-serif" }}>4.6K+</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Zadovoljnih klijenata</div>
            </div>

            {/* Star card top-left */}
            <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 border border-border rounded-xl p-3 shadow-card flex items-center gap-2"
              style={{ background: "hsl(0 0% 9%)" }}>
              <Star className="h-4 w-4 fill-primary text-primary" />
              <div>
                <div className="text-xs font-bold leading-none">5 / 5</div>
                <div className="text-[10px] text-muted-foreground">Google</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#usluge"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors animate-bounce"
          aria-label="Skroluj dole">
          <ChevronDown className="h-5 w-5" />
        </a>
      </section>

      {/* MARQUEE TICKER */}
      <div className="overflow-hidden border-y border-border py-3" style={{ background: "hsl(0 0% 5%)" }}>
        <div style={{ display: "flex", animation: "marquee 28s linear infinite", whiteSpace: "nowrap" }}>
          {[...Array(3)].map((_, rep) => (
            <span key={rep} className="flex items-center gap-0 shrink-0">
              {["POLIRANJE FAROVA", "LED UGRADNJA", "XENON SIJALICE", "ZAMENA STAKLA", "RESTAURACIJA PROJEKTORA", "GARANCIJA 3 GODINE", "VARENJE KUĆIŠTA", "SLANJE KURIRSKI"].map((item) => (
                <span key={item} className="flex items-center">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground px-6">{item}</span>
                  <span className="text-primary text-xs" aria-hidden>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* USLUGE */}
      <section id="usluge" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-14">
            <div className="text-primary font-semibold uppercase tracking-[0.3em] text-xs mb-3">Šta radimo</div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif" }}>
              Servis farova Loznica — naše usluge
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
              Specijalizovani smo isključivo za farove. Svaki far tretiramo individualno, sa pažnjom i
              preciznim alatom. Usluge vršimo i za klijente iz cele Srbije kurirskim slanjem.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div
                key={s.title}
                className="group border border-border rounded-xl p-6 hover:border-primary/70 transition-all duration-300 shadow-card"
                style={{ background: "hsl(0 0% 9%)" }}
              >
                <div className="bg-red-grad inline-flex p-3 rounded-lg mb-4 shadow-glow">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border border-border rounded-xl p-5 sm:p-6 flex flex-wrap items-center gap-4 justify-between"
            style={{ background: "hsl(0 0% 14%)" }}>
            <p className="text-sm text-muted-foreground">
              Rešavamo i probleme sa <span className="text-foreground font-semibold">vlagom i kondenzacijom</span>,
              menjamo DRL module, LED tube i pokvarene diode. Servis farova za celu{" "}
              <span className="text-foreground font-semibold">Srbiju</span> — šaljite kurirski!
            </p>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-red-grad hover:text-white hover:border-transparent transition-all">
              <a href="#kontakt">Zakaži termin</a>
            </Button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div ref={statsRef} style={{ background: "hsl(0 0% 5%)", borderTop: "1px solid hsl(0 0% 14%)", borderBottom: "1px solid hsl(0 0% 14%)" }}>
        <div className="container mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {[
            { value: counts[0], suffix: "+", label: "Godina iskustva" },
            { value: counts[1], suffix: "+", label: "Zadovoljnih klijenata" },
            { value: counts[2], suffix: " god.", label: "Garancija na rad" },
            { value: counts[3], suffix: "/5", label: "Google ocena" },
          ].map((stat, i) => (
            <div key={i} className="text-center md:border-r md:border-border last:border-0 px-4">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRE / POSLE */}
      <section id="radovi" className="py-20 md:py-28"
        style={{ background: "hsl(0 0% 7%)" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-14">
            <div className="text-primary font-semibold uppercase tracking-[0.3em] text-xs mb-3">Pre / Posle</div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif" }}>
              Poliranje farova Loznica — pre i posle
            </h2>
          </div>

          <div className="mb-4 text-sm text-muted-foreground flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
            Prevuci levo/desno da vidiš razliku
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {beforeAfter.map((ba) => (
              <BeforeAfterSlider key={ba.label} before={ba.before} after={ba.after} label={ba.label} />
            ))}
          </div>

          {/* GALERIJA */}
          <div className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <div className="text-primary font-semibold uppercase tracking-[0.3em] text-xs mb-2">Galerija</div>
                <h3 className="text-2xl md:text-3xl font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif" }}>
                  Naši radovi — LED i Xenon ugradnja, restauracija
                </h3>
              </div>
              <a href="https://www.instagram.com/servis_farova_caki/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                <Instagram className="h-4 w-4" /> Više na Instagramu
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {galleryItems.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group relative rounded-xl overflow-hidden shadow-card w-full aspect-square focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Otvori ${item.alt}`}
                >
                  <img
                    src={item.type === "video" ? (item.poster || farAfter) : item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  {item.type === "video" && (
                    <span className="absolute inset-0 flex items-center justify-center"
                      style={{ background: "hsl(0 0% 0% / 0.35)" }}>
                      <span className="bg-red-grad rounded-full p-3 shadow-glow">
                        <Play className="h-5 w-5 text-white fill-current" />
                      </span>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Social CTAs */}
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-border hover:border-primary rounded-2xl p-5 shadow-card transition-all duration-300"
                style={{ background: "hsl(0 0% 9%)" }}
              >
                <div className="bg-red-grad p-4 rounded-xl shadow-glow">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Pratite nas na {s.label}</div>
                  <div className="font-bold truncate group-hover:text-primary transition-colors" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {s.name}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* VIDEO FEATURE */}
        <div className="mt-16 rounded-2xl overflow-hidden relative border border-border shadow-card" style={{ background: "hsl(0 0% 5%)" }}>
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="relative aspect-video md:aspect-auto md:h-full min-h-[220px]">
              <video
                src={cakiVideo}
                autoPlay muted loop playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent 60%, hsl(0 0% 5%))" }} />
            </div>
            <div className="p-8 md:p-10">
              <div className="text-primary font-semibold uppercase tracking-[0.3em] text-xs mb-4">Video prikaz</div>
              <h3 className="text-3xl md:text-4xl font-bold uppercase mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
                Vidite rad izbliza
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Svaki detalj radimo sa preciznošću i pažnjom — od dijagnostike do završne kontrole
                kvaliteta. Pratite nas na Instagramu za još transformacija.
              </p>
              <Button asChild className="bg-red-grad hover:opacity-90 shadow-glow text-white font-semibold">
                <a href="https://www.instagram.com/servis_farova_caki/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 h-4 w-4" /> Više videa na Instagramu
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* PROCES */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-14">
            <div className="text-primary font-semibold uppercase tracking-[0.3em] text-xs mb-3">Kako radimo</div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif" }}>
              Proces u 4 koraka
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { n: "01", t: "Zakazivanje", d: "Pozovite nas i dogovorite termin ili pošaljite farove kurirski." },
              { n: "02", t: "Dijagnostika", d: "Pregledamo far i predlažemo optimalno rešenje." },
              { n: "03", t: "Popravka", d: "Stručna restauracija u našoj specijalizovanoj radionici." },
              { n: "04", t: "Garancija 3 god.", d: "Vraćamo vam far kao nov — sa garancijom 3 godine." },
            ].map((step) => (
              <div key={step.n} className="relative border border-border rounded-xl p-6 shadow-card"
                style={{ background: "hsl(0 0% 9%)" }}>
                <div
                  className="text-6xl font-bold mb-2 text-stroke select-none"
                  style={{
                    color: "transparent",
                    fontFamily: "Oswald, sans-serif",
                    WebkitTextStroke: "1.5px hsl(0 0% 100% / 0.1)",
                  }}
                >
                  {step.n}
                </div>
                <h3 className="font-bold text-xl mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>{step.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.d}</p>
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENZIJE */}
      <section className="py-20 md:py-28" style={{ background: "hsl(0 0% 7%)" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-primary font-semibold uppercase tracking-[0.3em] text-xs mb-3">Recenzije</div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif" }}>
                Šta kažu klijenti
              </h2>
            </div>
            <div className="flex items-center gap-3 border border-border rounded-xl px-5 py-3" style={{ background: "hsl(0 0% 9%)" }}>
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
              </div>
              <div>
                <div className="font-bold text-sm">5.0 / 5</div>
                <div className="text-xs text-muted-foreground">Google recenzije</div>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-border rounded-2xl p-6 shadow-card flex flex-col gap-4 hover:border-primary/40 transition-all duration-300"
                style={{ background: "hsl(0 0% 9%)" }}>
                <MessageSquare className="h-6 w-6 text-primary/30 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.city}</div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: t.stars }).map((_, s) => <Star key={s} className="h-3.5 w-3.5 fill-primary text-primary" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO TEXT BLOCK */}
      <section className="py-12 md:py-16" style={{ background: "hsl(0 0% 7%)" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold uppercase mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
              Servis Farova Srbija — šaljite iz celog grada
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Servis Farova Čaki je specijalizovana radionica za farove sa sedištem u Loznici, ali usluge
              pružamo klijentima iz cele Srbije. Bez obzira da li ste iz Beograda, Novog Sada, Niša, Šapca,
              Valjeva, Kragujevca ili bilo kog drugog mesta — farove nam možete poslati kurirskom službom.
              Svaki far pažljivo pakujemo i bezbedno vraćamo na vašu adresu.
              <br /><br />
              Specijalizovani smo za: <strong className="text-foreground">poliranje farova</strong>,{" "}
              <strong className="text-foreground">LED i Xenon ugradnju</strong>,{" "}
              <strong className="text-foreground">zamenu stakla fara</strong>,{" "}
              <strong className="text-foreground">restauraciju projektora</strong> i{" "}
              <strong className="text-foreground">varenje kućišta farova</strong>. Sa više od 4.600 zadovoljnih
              klijenata i Google ocenom 5/5, Servis Farova Čaki je pouzdana adresa za sve vaše farove u Srbiji.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-12">
            <div className="text-primary font-semibold uppercase tracking-[0.3em] text-xs mb-3">Pitanja</div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif" }}>
              Često postavljana pitanja
            </h2>
          </div>
          <div className="max-w-2xl space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-border rounded-xl overflow-hidden shadow-card transition-all duration-200"
                style={{ background: "hsl(0 0% 9%)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className="h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="py-20 md:py-28 bg-hero">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-primary font-semibold uppercase tracking-[0.3em] text-xs mb-3">Kontakt</div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>
                Zakažite servis farova u Loznici
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md leading-relaxed text-sm sm:text-base">
                Radimo isključivo uz prethodno zakazivanje. Možete nam poslati farove i kurirskom
                službom — pažljivo ih pakujemo i sigurno vraćamo na vašu adresu u Srbiji.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:0621770679"
                  className="flex items-center gap-4 border border-border rounded-xl p-4 hover:border-primary transition-all duration-200 group"
                  style={{ background: "hsl(0 0% 9%)" }}
                >
                  <div className="bg-red-grad p-3 rounded-lg shadow-glow">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Telefon</div>
                    <div className="font-bold text-lg group-hover:text-primary transition-colors">062 1770679</div>
                  </div>
                </a>
                <div className="flex items-center gap-4 border border-border rounded-xl p-4"
                  style={{ background: "hsl(0 0% 9%)" }}>
                  <div className="bg-red-grad p-3 rounded-lg shadow-glow">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Adresa</div>
                    <div className="font-bold">Vere Bajan 84, Loznica 15300</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 border border-border rounded-xl p-4"
                  style={{ background: "hsl(0 0% 9%)" }}>
                  <div className="bg-red-grad p-3 rounded-lg shadow-glow">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Radno vreme</div>
                    <div className="font-bold">Pon–Sub · od 8h (uz najavu)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-card aspect-square">
              <iframe
                title="Lokacija Servis Farova Čaki Loznica"
                src="https://www.google.com/maps?q=Vere+Bajan+84,+Loznica&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "hsl(0 0% 4%)", borderTop: "1px solid hsl(0 0% 14%)" }}>
        <div className="container mx-auto px-4 py-14">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <a href="#" className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Servis Farova Čaki" className="h-12 w-12 rounded-lg object-cover" />
                <div>
                  <div className="font-bold tracking-wide text-base" style={{ fontFamily: "Oswald, sans-serif" }}>SERVIS FAROVA</div>
                  <div className="text-xs font-semibold tracking-[0.3em]" style={{ color: "hsl(0 82% 50%)" }}>ČAKI · LOZNICA</div>
                </div>
              </a>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-5">
                Specijalizovana radionica za farove u Loznici. Poliranje, LED ugradnja, zamena stakla
                i restauracija — za celu Srbiju, kurirskim slanjem.
              </p>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="h-9 w-9 flex items-center justify-center rounded-lg border border-border hover:bg-red-grad hover:border-primary transition-all duration-200"
                    style={{ background: "hsl(0 0% 9%)" }}>
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground mb-4">Usluge</div>
              <ul className="space-y-2.5 text-sm">
                {["Poliranje farova", "LED i Xenon ugradnja", "Zamena stakla fara", "Dubinsko čišćenje", "Restauracija projektora", "Varenje kućišta"].map(u => (
                  <li key={u}><a href="#usluge" className="text-muted-foreground hover:text-primary transition-colors">{u}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground mb-4">Kontakt</div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><a href="tel:0621770679" className="hover:text-primary transition-colors">062 1770679</a></li>
                <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span>Vere Bajan 84<br/>Loznica 15300</span></li>
                <li className="flex items-start gap-2"><Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span>Pon–Sub · od 8h<br/>(uz prethodnu najavu)</span></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-border text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Servis Farova Čaki — Loznica, Srbija. Sva prava zadržana.</span>
            <div className="flex items-center gap-4">
              <a href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</a>
              <a href="/robots.txt" className="hover:text-primary transition-colors">Robots.txt</a>
            </div>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "hsl(0 0% 4% / 0.97)", backdropFilter: "blur(8px)" }}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 h-11 w-11 rounded-full border border-border hover:bg-red-grad hover:border-primary flex items-center justify-center transition-all"
            style={{ background: "hsl(0 0% 9%)" }}
            aria-label="Zatvori"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-border hover:bg-red-grad hover:border-primary flex items-center justify-center transition-all"
            style={{ background: "hsl(0 0% 9%)" }}
            aria-label="Prethodna"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-border hover:bg-red-grad hover:border-primary flex items-center justify-center transition-all"
            style={{ background: "hsl(0 0% 9%)" }}
            aria-label="Sledeća"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div
            className="max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryItems[lightboxIndex].type === "video" ? (
              <video
                key={galleryItems[lightboxIndex].src}
                src={galleryItems[lightboxIndex].src}
                poster={galleryItems[lightboxIndex].poster}
                controls
                autoPlay
                playsInline
                className="max-h-[85vh] w-auto max-w-full rounded-xl shadow-card"
              />
            ) : (
              <img
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].alt}
                className="max-h-[85vh] w-auto max-w-full rounded-xl shadow-card object-contain"
              />
            )}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground border border-border px-3 py-1.5 rounded-full"
            style={{ background: "hsl(0 0% 9% / 0.9)" }}>
            {lightboxIndex + 1} / {galleryItems.length}
          </div>
        </div>
      )}

      {/* Floating call button on mobile */}
      <a
        href="tel:0621770679"
        className="fixed bottom-5 right-5 z-50 md:hidden flex items-center gap-2 bg-red-grad text-white font-semibold text-sm rounded-full px-5 py-3 shadow-glow"
        aria-label="Pozovi"
      >
        <Phone className="h-4 w-4" />
        Pozovi
      </a>
    </div>
  );
}
