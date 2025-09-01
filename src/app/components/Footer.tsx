// components/Footer.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiGithub, FiTwitter, FiInstagram, FiMail } from "react-icons/fi";

type FooterLink = { label: string; href: string };
type FooterSection = { title: string; links: FooterLink[] };

type SocialItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  icon: React.ReactNode;
};

type BrandInfo = {
  name: string;
  slogan?: string;
  href?: string;
  // Ruta del logo (usaremos el que compartiste: IMG_0340.PNG)
  logoSrc?: string;
};

type FooterProps = {
  brand?: BrandInfo;
  sections?: FooterSection[];
  social?: SocialItem[];
  className?: string;
};

const defaultBrand: BrandInfo = {
  name: "Alexis Reyna",
  slogan: "Hecho con calma — y café.",
  href: "/",
  logoSrc: "/assets/logos/IMG_0340.PNG", // Footer usa este logo según tu Navbar
};

const defaultSections: FooterSection[] = [
  {
    title: "Producto",
    links: [
      { label: "Características", href: "/#features" },
      { label: "Precios", href: "/pricing" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { label: "Nosotros", href: "/about" },
      { label: "Carreras", href: "/careers" },
      { label: "Contacto", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad", href: "/privacy" },
      { label: "Términos", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

const defaultSocial: SocialItem[] = [
  { label: "GitHub", href: "https://github.com/", icon: <FiGithub />, ariaLabel: "GitHub" },
  { label: "Twitter", href: "https://x.com/", icon: <FiTwitter />, ariaLabel: "Twitter/X" },
  { label: "Instagram", href: "https://instagram.com/", icon: <FiInstagram />, ariaLabel: "Instagram" },
  { label: "Email", href: "mailto:hola@tu-dominio.com", icon: <FiMail />, ariaLabel: "Enviar correo" },
];

export default function Footer({
  brand = defaultBrand,
  sections = defaultSections,
  social = defaultSocial,
  className = "",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      role="contentinfo"
      className={[
        // Fondo negro + contraste fuerte
        "border-t border-white/10",
        "bg-black text-neutral-200",
        "backdrop-blur supports-[backdrop-filter]:bg-black/95",
        className,
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        {/* Top */}
        <div className="grid gap-12 md:grid-cols-12">
          {/* Marca */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <BrandMark href={brand.href} name={brand.name} slogan={brand.slogan} logoSrc={brand.logoSrc} />
            <SocialRow items={social} />
          </div>

          {/* Secciones */}
          <nav
            aria-label="Footer"
            className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8"
          >
            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-neutral-400">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Divider sutil */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-neutral-400">
            © {year} {brand.name}. Hecho con calma — y café.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-300">
            <li>
              <FooterLink href="/status">Status</FooterLink>
            </li>
            <li>
              <FooterLink href="/changelog">Changelog</FooterLink>
            </li>
            <li>
              <FooterLink href="/brand">Brand</FooterLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Subcomponentes ---------- */

function BrandMark({
  href,
  name,
  slogan,
  logoSrc = "/assets/logos/IMG_0340.PNG",
}: {
  href?: string;
  name: string;
  slogan?: string;
  logoSrc?: string;
}) {
  const Mark = (
    <div className="flex items-center gap-3">
      {/* Logo (el que compartiste) */}
      <span
        className="relative inline-flex size-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10"
        aria-hidden="true"
      >
        <Image
          src={logoSrc}
          alt={`${name} logo`}
          fill
          sizes="36px"
          className="object-contain p-1.5"
          priority
        />
      </span>

      <div className="flex flex-col">
        <span className="font-semibold tracking-tight text-base text-neutral-100">{name}</span>
        {slogan ? (
          <span className="text-sm text-neutral-400">{slogan}</span>
        ) : null}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="group inline-flex w-fit items-center">
      {Mark}
      <span className="sr-only">{name}</span>
    </Link>
  ) : (
    Mark
  );
}

function SocialRow({ items }: { items: SocialItem[] }) {
  return (
    <ul className="flex items-center gap-3">
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel ?? item.label}
            className={[
              "inline-flex items-center justify-center",
              "h-9 w-9 rounded-full",
              "border border-white/15 text-neutral-100",
              "hover:-translate-y-0.5 transition-all duration-200",
              "hover:border-white/30 hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
            ].join(" ")}
          >
            <span className="text-[18px]">{item.icon}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function FooterLink({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) {
  const content = (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative">
        <span className="text-neutral-300 hover:text-white transition-colors">
          {children}
        </span>
        {/* subrayado sutil al hover en blanco */}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/70 transition-all duration-200 group-hover:w-full" />
      </span>
    </span>
  );

  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  return isExternal ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group"
    >
      {content}
    </a>
  ) : (
    <Link href={href} className="group">
      {content}
    </Link>
  );
}