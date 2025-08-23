"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({ href, children }) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-sm font-medium ${
        active ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-[220px_1fr]">
      {/* Sidebar */}
      <aside className="border-r bg-gray-50 p-4">
        <h2 className="text-lg font-semibold mb-3 text-blue-950">Dashboard</h2>
        <nav className="space-y-1">
          <NavItem href="/dashboard">Home</NavItem>
          <NavItem href="/dashboard/products">All Products</NavItem>
          <NavItem href="/dashboard/add-product">Add Product</NavItem>
        </nav>
      </aside>

      {/* Content */}
      <main className="p-4">{children}</main>
    </div>
  );
}
