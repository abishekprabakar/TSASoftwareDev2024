import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { label: "MindCasts", href: "/mindcasts" },
  { label: "Counsel", href: "/counsel" },
  { label: "Settings", href: "/settings" },
];

const Appbar = () => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 z-20 w-full bg-dar-900 pt-safe">
      <header className="border-b bg-dar-100 px-safe dark:border-dar-800 dark:bg-dar-900">
        <div className="flex items-center justify-between h-20 max-w-screen-md px-6 mx-auto">
          <Link href="/">
            <div className="flex gap-2">
              <Image
                src="/images/favicon.png"
                alt="MindCasts"
                className="w-8 h-8 rounded-full"
                width={32}
                height={32}
              />
              <h1 className="font-medium leading-8">MindCasts</h1>
            </div>
          </Link>

          <nav className="flex items-center space-x-6">
            <div className="hidden sm:block">
              <div className="flex items-center space-x-6">
                {links.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className={`text-sm ${
                      router.pathname === href
                        ? "text-pri-500 dark:text-pri-400"
                        : "text-dar-600 hover:text-dar-900 dark:text-dar-400 dark:hover:text-dar-50"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div
              title="Account"
              className="w-10 h-10 bg-center bg-cover rounded-full shadow-inner bg-dar-200 dark:bg-dar-800"
              style={{ backgroundImage: "url(images/favicon.png)" }}
            />
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Appbar;
