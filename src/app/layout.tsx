import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { SITE } from "@/data/site";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rahulkirahh.com"),
  title: `${SITE.person.name} — ${SITE.person.tagline}`,
  description: SITE.person.shortBio,
  keywords: [
    "Rahul Ki Rahh",
    "Growth Architect",
    "System Thinker",
    "DiziDice Media",
    "WhatsApp Distribution",
    "Performance Marketing",
    "Fintech User Acquisition",
    "SEO Systems",
    "Web Development",
  ],
  authors: [{ name: SITE.person.name, url: "https://dizidice.com" }],
  creator: SITE.person.name,
  alternates: {
    canonical: "https://rahulkirahh.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rahulkirahh.com",
    title: `${SITE.person.name} — ${SITE.person.tagline}`,
    description: SITE.person.shortBio,
    siteName: SITE.person.name,
    images: [
      {
        url: "/images/rahul.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE.person.name} — ${SITE.person.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.person.name} — ${SITE.person.tagline}`,
    description: SITE.person.shortBio,
    images: ["/images/rahul.jpg"],
    creator: "@rahul_ki_rahh",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rahul Ki Rahh",
  jobTitle: "Founder, DiziDice Media",
  url: "https://rahulkirahh.com",
  sameAs: [
    "https://www.linkedin.com/in/rahul-ki-rahh/",
    "https://x.com/rahul_ki_rahh",
    "https://instagram.com/rahul_ki_rahh",
    "https://www.facebook.com/rk929336/",
  ],
  worksFor: {
    "@type": "Organization",
    name: "DiziDice Media",
    url: "https://dizidice.com",
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DiziDice Media",
  url: "https://dizidice.com",
  founder: {
    "@type": "Person",
    name: "Rahul Ki Rahh",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="bg-obsidian-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
        <Script
          id="chatwoot-sdk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,t) {
                var BASE_URL="https://chatwoot.dizidice.com";
                var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                g.src=BASE_URL+"/packs/js/sdk.js";
                g.async = true;
                s.parentNode.insertBefore(g,s);
                g.onload=function(){
                  window.chatwootSDK.run({
                    websiteToken: 'ZvUtWyJ4bwQfhTpcePw9skGb',
                    baseUrl: BASE_URL
                  })
                }
              })(document,"script");
            `,
          }}
        />
      </body>
    </html>
  );
}
