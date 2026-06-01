interface LogoProps { size?: number; className?: string; }

const s = (size = 24) => ({ width: size, height: size, fill: "currentColor" });

export function VWLogo({ size = 24, className }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" {...s(size)} className={className}>
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M50 18 L30 62 L50 72 L70 62 Z M50 72 L34 54 H40 L50 72 Z" />
      <path d="M50 18 L34 54 H40 L50 36 L60 54 H66 L50 18 Z" />
      <path d="M28 54 L21 38 L14 54 H28 Z" opacity="0" />
      <text x="50" y="60" textAnchor="middle" fontSize="38" fontWeight="bold" fontFamily="Arial,sans-serif" fill="currentColor" dy="0">VW</text>
    </svg>
  );
}

export function AudiLogo({ size = 24, className }: LogoProps) {
  return (
    <svg viewBox="0 0 104 28" width={Math.round(size * 3.7)} height={size} className={className}>
      {[0, 26, 52, 78].map((x) => (
        <circle key={x} cx={x + 14} cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="2.2" />
      ))}
    </svg>
  );
}

export function BMWLogo({ size = 24, className }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" {...s(size)} className={className}>
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="13.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 6.5 A13.5 13.5 0 0 1 33.5 20 L20 20 Z" />
      <path d="M20 20 A13.5 13.5 0 0 1 6.5 20 L20 20 Z" />
    </svg>
  );
}

export function MercedesLogo({ size = 24, className }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" {...s(size)} className={className}>
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 5 L22 19 L20 21 L18 19 Z" />
      <path d="M20 5 L22 19 L20 21 L18 19 Z" transform="rotate(120 20 20)" />
      <path d="M20 5 L22 19 L20 21 L18 19 Z" transform="rotate(240 20 20)" />
      <circle cx="20" cy="20" r="2" />
    </svg>
  );
}

export function ToyotaLogo({ size = 24, className }: LogoProps) {
  return (
    <svg viewBox="0 0 60 38" width={Math.round(size * 1.6)} height={size} className={className}>
      <ellipse cx="30" cy="22" rx="28" ry="14" fill="none" stroke="currentColor" strokeWidth="3" />
      <ellipse cx="30" cy="22" rx="17" ry="22" fill="none" stroke="currentColor" strokeWidth="3" />
      <ellipse cx="30" cy="6" rx="12" ry="4.5" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export function FordLogo({ size = 24, className }: LogoProps) {
  return (
    <svg viewBox="0 0 80 36" width={Math.round(size * 2.2)} height={size} className={className}>
      <ellipse cx="40" cy="18" rx="38" ry="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <text x="40" y="24" textAnchor="middle" fontSize="20" fontWeight="bold" fontFamily="Arial,sans-serif" fontStyle="italic" fill="currentColor">Ford</text>
    </svg>
  );
}

export function RenaultLogo({ size = 24, className }: LogoProps) {
  return (
    <svg viewBox="0 0 30 36" width={Math.round(size * 0.83)} height={size} className={className}>
      <polygon points="15,2 28,18 15,34 2,18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="15,8 23,18 15,28 7,18" fill="currentColor" opacity="0.5" />
      <polygon points="15,8 23,18 15,28 7,18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function PeugeotLogo({ size = 24, className }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" {...s(size)} className={className}>
      <path d="M20 4 L28 14 L28 28 L20 36 L12 28 L12 14 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M16 12 L24 12 L24 20 L20 24 L16 20 Z" fill="currentColor" />
    </svg>
  );
}

export function HyundaiLogo({ size = 24, className }: LogoProps) {
  return (
    <svg viewBox="0 0 60 36" width={Math.round(size * 1.67)} height={size} className={className}>
      <ellipse cx="30" cy="18" rx="28" ry="15" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="30" y="24" textAnchor="middle" fontSize="22" fontWeight="bold" fontFamily="Arial,sans-serif" fontStyle="italic" fill="currentColor">H</text>
    </svg>
  );
}

export function KiaLogo({ size = 24, className }: LogoProps) {
  return (
    <svg viewBox="0 0 70 28" width={Math.round(size * 2.5)} height={size} className={className}>
      <text x="35" y="22" textAnchor="middle" fontSize="24" fontWeight="bold" fontFamily="Arial,sans-serif" fill="currentColor" letterSpacing="4">KIA</text>
    </svg>
  );
}

export function FiatLogo({ size = 24, className }: LogoProps) {
  return (
    <svg viewBox="0 0 60 36" width={Math.round(size * 1.67)} height={size} className={className}>
      <ellipse cx="30" cy="18" rx="28" ry="15" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="30" y="24" textAnchor="middle" fontSize="18" fontWeight="bold" fontFamily="Arial,sans-serif" fill="currentColor" letterSpacing="2">FIAT</text>
    </svg>
  );
}

export function NissanLogo({ size = 24, className }: LogoProps) {
  return (
    <svg viewBox="0 0 80 28" width={Math.round(size * 2.86)} height={size} className={className}>
      <ellipse cx="40" cy="14" rx="38" ry="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="12" y="11" width="56" height="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="40" y="19.5" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Arial,sans-serif" fill="currentColor" letterSpacing="3">NISSAN</text>
    </svg>
  );
}

export function HondaLogo({ size = 24, className }: LogoProps) {
  return (
    <svg viewBox="0 0 44 36" width={Math.round(size * 1.22)} height={size} className={className}>
      <path d="M6 4 L6 32 M6 18 L22 18 M22 4 L22 32 M28 32 A14 14 0 0 1 28 4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export const carBrands: { name: string; Logo: React.ComponentType<LogoProps> }[] = [
  { name: "Volkswagen",  Logo: VWLogo },
  { name: "BMW",         Logo: BMWLogo },
  { name: "Mercedes",    Logo: MercedesLogo },
  { name: "Audi",        Logo: AudiLogo },
  { name: "Toyota",      Logo: ToyotaLogo },
  { name: "Ford",        Logo: FordLogo },
  { name: "Renault",     Logo: RenaultLogo },
  { name: "Peugeot",     Logo: PeugeotLogo },
  { name: "Hyundai",     Logo: HyundaiLogo },
  { name: "Kia",         Logo: KiaLogo },
  { name: "Fiat",        Logo: FiatLogo },
  { name: "Honda",       Logo: HondaLogo },
  { name: "Nissan",      Logo: NissanLogo },
];
