import "../../public/assets/css/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full bg-gray-ultra-light">
      <body>{children}</body>
    </html>
  );
}
