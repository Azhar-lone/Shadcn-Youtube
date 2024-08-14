import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { NavLink, useLocation } from "react-router-dom";

// Components
import { buttonVariants } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  HomeIcon,
  ClockIcon,
  HistoryIcon,
  PlaySquareIcon,
  ListVideoIcon,
  TrophyIcon,
  HelpCircleIcon,
  ThumbsUpIcon,
  MusicIcon,
  SettingsIcon,
  Gamepad2Icon,
  CirclePlayIcon,
  UsersIcon,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

const Sidebar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>(
    window.location.pathname
  );

  const isSidebarOpen = useSelector(
    (store: RootState) => store.sidebar.isMenuOpen
  );

  const location = useLocation();

  useEffect(() => {
    setSelectedTab(location.pathname);
  }, [location.pathname]);

  if (!isSidebarOpen) return null;

  return (
    <ScrollArea className="sm:flex flex-col sm:w-[17%] items-start  absolute left-0 gap-1  hidden h-[95vh] overflow-y-auto py-5">
      {categorizedLinks.map((items, index) => (
        <div
          key={index}
          className="flex flex-col justify-center gap-3 w-[90%] mx-auto "
        >
          {items.category && (
            <h1 className="text-lg font-bold p-2 ">{items.category}</h1>
          )}
          {items.links.map(({ Icon, href, text }, index) => (
            // <div></div>
            <NavLink
              to={href}
              key={index}
              onClick={() => setSelectedTab(href)}
              className={buttonVariants({
                variant: selectedTab === href ? "secondary" : "ghost",
                className: `flex gap-3 w-full  ${
                  selectedTab === href && "font-extrabold text-lg"
                }`,
              })}
            >
              <Icon />
              <div className="w-[70%] hidden md:block">{text}</div>
            </NavLink>
          ))}
          <hr className="border-b" />
        </div>
      ))}
    </ScrollArea>
  );
};

export default Sidebar;

interface Links {
  href: string;
  text: string;
  Icon: LucideIcon;
}

interface categorizedLinks {
  category?: string;
  links: Links[];
}

let categorizedLinks: categorizedLinks[] = [
  {
    links: [
      {
        href: "/",
        text: "Home",
        Icon: HomeIcon,
      },

      {
        href: "/shorts",
        text: "Shorts",
        Icon: CirclePlayIcon,
      },

      {
        href: "/subscriptions",
        text: "Subscriptions",
        Icon: PlaySquareIcon,
      },
    ],
  },

  {
    category: "You",
    links: [
      {
        href: "/your-channel",
        text: "Your Channel",
        Icon: UsersIcon,
      },
      {
        href: "/history",
        text: "History",
        Icon: HistoryIcon,
      },
      {
        href: "/playlist",
        text: "Playlist",
        Icon: ListVideoIcon,
      },
      {
        href: "/liked",
        text: "Liked videos",
        Icon: ThumbsUpIcon,
      },
      {
        href: "/watchlater",
        text: "Watch later",
        Icon: ClockIcon,
      },
    ],
  },

  {
    category: "Explore",
    links: [
      {
        href: "/",
        text: "Home",
        Icon: HomeIcon,
      },

      {
        href: "/feed/music",
        text: "Music",
        Icon: MusicIcon,
      },

      {
        href: "/feed/gaming",
        text: "Gaming",
        Icon: Gamepad2Icon,
      },

      {
        href: "/feed/sports",
        text: "Sports",
        Icon: TrophyIcon,
      },
    ],
  },
  {
    links: [
      {
        href: "/settings",
        text: "Settings",
        Icon: SettingsIcon,
      },

      {
        href: "/help",
        text: "Help Center",
        Icon: HelpCircleIcon,
      },
    ],
  },
];
