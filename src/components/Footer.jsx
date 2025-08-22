export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
}
