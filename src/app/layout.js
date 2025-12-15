
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PillNav from "@/components/Navbar/PillNav";
import Footer from "@/components/Footer/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});


export const metadata = {
  metadataBase: new URL("https://ai-resume-analyzer.vercel.app"),

  title: {
    default:
      "ATSQuick – Free ATS Resume Check in Seconds",
    template:
      "%s | Free AI Resume Score Analyzer",
  },

  description:
    "Analyze your resume in seconds with ATSQuick. Get a free ATS resume score, keyword match, job-fit percentage, and AI-powered improvement suggestions—fast, accurate, and recruiter-ready.",

  keywords: [
  "ATS resume checker",
  "free ATS resume check",
  "ATS resume score",
  "resume ATS scan",
  "AI resume analyzer",
  "resume score online",
  "job match percentage",
  "resume keyword optimization",
  "AI resume review",
  "ATS resume optimization tool",
  "machine learning resume analysis",
  "resume screening software",
  "Next.js AI resume project"
],


  authors: [{ name: "Akshat Dev" }],
  creator: "ATSQuick",
  publisher: "ATSQuick",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "",
  },

  openGraph: {
    title:
      "ATSQuick – Free ATS Resume Check in Seconds",
    description:
      "Upload your resume and get an AI-powered ATS score, skill analysis, and job match insights in seconds.",
    url: "https://ai-resume-analyzer.vercel.app",
    siteName: "ATSQuick – Free ATS Resume Check in Seconds",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "AI Resume Score Analyzer Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  category: "technology",
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <PillNav items={navItems} activeHref="/" />
        {children}
         <Footer />
      </body>
    </html>
  );
}
