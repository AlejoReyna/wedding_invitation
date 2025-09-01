// components/Footer.tsx
import React, { useState, useEffect, useRef } from "react";
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
  slogan: "Hecho con calma — y café",
  href: "/",
  logoSrc: "/assets/logos/IMG_0340.PNG", // Footer usa este logo según tu Navbar
};

const defaultSections: FooterSection[] = [];

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
  const [isVisible, setIsVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const footerRef = useRef<HTMLElement>(null);
  const targetText = "¡Hablemos!";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= targetText.length) {
        setDisplayText(targetText.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [isVisible]);

  return (
    <footer
      ref={footerRef}
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

          {/* Mensaje centrado en md+, alineado a la derecha en sm */}
          <div className="md:col-span-8 flex justify-end md:justify-center items-center">
            <a 
              href="https://wa.me/8140490960?text=%C2%A1Hola%21%20Me%20gustar%C3%ADa%20hablar%20de%20..." 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg text-neutral-200 font-medium hover:text-white transition-colors cursor-pointer"
            >
              ¿Tienes una idea?{" "}
              <span className="font-semibold text-white underline underline-offset-4 decoration-white/60 hover:decoration-white transition-colors">
                {displayText}
                {isVisible && displayText.length < targetText.length && (
                  <span className="animate-pulse">|</span>
                )}
              </span>
            </a>
          </div>
        </div>

        {/* Divider sutil */}

      
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