import Link from "next/link";
import { useRouter } from "next/router";
import { HiCog8Tooth } from "react-icons/hi2";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { HiMiniMusicalNote } from "react-icons/hi2";

const BottomNav = () => {
  const router = useRouter();

  return (
    <div className="sm:hidden">
      <nav className="fixed bottom-0 w-full border-t bg-dar-100 pb-safe dark:border-dar-800 dark:bg-dar-900">
        <div className="flex items-center justify-around h-16 max-w-md px-6 mx-auto">
          {links.map(({ href, label, icon }) => (
            <Link
              key={label}
              href={href}
              className={`flex h-full w-full flex-col items-center justify-center space-y-1 ${
                router.pathname === href
                  ? "text-pri-500 dark:text-pri-400"
                  : "text-dar-600 hover:text-dar-900 dark:text-dar-400 dark:hover:text-dar-50"
              }`}
            >
              {icon}
              <span className="text-xs text-dar-600 dark:text-dar-400">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;

const links = [
  {
    label: "MindCasts",
    href: "/mindcasts",
    // TODO: Replace with something more meaningful
    icon: <HiMiniMusicalNote className="w-6 h-6" />,
  },
  {
    label: "Counsel",
    href: "/counsel",
    icon: <HiMiniChatBubbleLeftRight className="w-6 h-6" />,
  },
  {
    label: "Setitngs",
    href: "/settings",
    icon: <HiCog8Tooth className="w-6 h-6" />,
  },
];
