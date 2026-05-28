import { Link, useLocation } from "react-router-dom";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const links = [
    {
      label: "Dashboard",
      path: "/",
    },
    {
      label: "Uploads",
      path: "/upload",
    },
    {
      label: "Review Queue",
      path: "/review",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-10">Breathe ESG</h1>

        <nav className="space-y-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-xl transition ${
                location.pathname === link.path
                  ? "bg-white text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="ml-64 p-8">{children}</main>
    </div>
  );
};

export default AppLayout;
