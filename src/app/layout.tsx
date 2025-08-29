export const metadata = { title: "Shop Spike", description: "Next.js + .NET" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
            <a href="/" className="font-semibold">
              Shop
            </a>
            <nav className="text-sm">
              <a href="/catalog/all" className="hover:underline">
                Catalogus
              </a>
            </nav>
            <a href="/cart" className="ml-auto hover:underline">
              Cart
            </a>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
