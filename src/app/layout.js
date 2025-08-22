import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata = {
  title: "My Shop",
  description: "Simple Next.js demo app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
      <Providers>  <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        </Providers>
      </body>
    </html>
  );
}
