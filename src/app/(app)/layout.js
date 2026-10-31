import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Trotador",
  description: "Gerenciador de trotes escolares",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen">
        <div className="flex min-h-screen">
          <aside className="w-64 shrink-0 border-r border-neutral-800 bg-neutral-950 p-5 text-neutral-100">
            <Link className="mb-8 block text-lg font-bold" href="/">
              Trotador
            </Link>
            <nav aria-label="Navegação principal" className="space-y-1">
              <Link
                className="block rounded-md px-3 py-2 text-sm hover:bg-neutral-800"
                href="/"
              >
                Visão geral
              </Link>
              <Link
                className="block rounded-md px-3 py-2 text-sm hover:bg-neutral-800"
                href="/vendas/nova"
              >
                Nova venda
              </Link>
            </nav>
          </aside>
          <main className="min-w-0 flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}