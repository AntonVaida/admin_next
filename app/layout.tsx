import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/hoc";

export const metadata: Metadata = {
  title: "Адмін-панель мобільного додатку | Mobile App Admin",
  description: "Керуйте налаштуваннями та контентом мобільного додатку з легкістю.",
  openGraph: {
    title: "Адмін-панель мобільного додатку | Mobile App Admin",
    description: "Керуйте налаштуваннями та контентом мобільного додатку з легкістю.",
    url: "https://your-admin-panel.com",
    siteName: "Mobile App Admin",
    images: [
      {
        url: "https://imgv3.fotor.com/images/homepage-feature-card/download-the-edited-icons-in-multiple-formats-with-fotor-icon-editor_2023-08-09-032937_rkeg.png",
        width: 1200,
        height: 630,
        alt: "Адмін-панель мобільного додатку",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Адмін-панель мобільного додатку | Mobile App Admin",
    description: "Керуйте налаштуваннями та контентом мобільного додатку з легкістю.",
    images: ["https://imgv3.fotor.com/images/homepage-feature-card/download-the-edited-icons-in-multiple-formats-with-fotor-icon-editor_2023-08-09-032937_rkeg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
