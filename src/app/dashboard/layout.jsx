// src/app/dashboard/layout.jsx (client component)
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({ href, children }) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "block px-3 py-2 rounded-md text-sm font-medium transition",
        active
          // Active = brand color and readable text
          ? "bg-primary text-primary-content shadow-sm"
          // Inactive = subtle text; hover uses base tokens
          : "text-base-content/80 hover:bg-base-200 hover:text-base-content"
      ].join(" ")}
    >
      {children}
    </Link>
  );
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-[220px_1fr] bg-base-100 text-base-content">
      {/* Sidebar */}
      <aside className="border-r border-base-300 bg-base-200 p-4">
        <h2 className="text-lg font-semibold mb-3 text-primary">Dashboard</h2>
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
