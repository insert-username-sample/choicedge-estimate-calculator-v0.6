import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">{children}</main>
      <footer className="text-center text-sm text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} Choicedge | All Rights Reserved
      </footer>
    </div>
  );
}

export default Layout;
