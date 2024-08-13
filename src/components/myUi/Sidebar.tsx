import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { NavLink, useLocation } from "react-router-dom";

// Components
import { buttonVariants } from "../ui/button";

import {
  HomeIcon,
  ClockIcon,
  TrophyIcon,
  LightbulbIcon,
  HelpCircleIcon,
  ThumbsUpIcon,
  FilmIcon,
  MusicIcon,
  SettingsIcon,
  Gamepad2Icon,
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
    <div className="sm:flex flex-col sm:w-[12%] items-start top-[10vh] fixed left-0 gap-1  hidden h-[90vh]">
      {Links.map(({ Icon, href, text }, index) => (
        // <div></div>
        <NavLink
          to={href}
          key={index}
          onClick={() => setSelectedTab(href)}
          className={buttonVariants({
            variant: selectedTab === href ? "secondary" : "ghost",
            className: `flex gap-3 w-full ${
              selectedTab === href && "font-extrabold"
            }`,
          })}
        >
          <Icon />
          <div className="w-[80%]">{text}</div>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;

interface Links {
  href: string;
  text: string;
  Icon: LucideIcon;
}

interface categorizedLinks {
  category: string;
  links: Links[];
}

let Links: Links[] = [
  {
    href: "/",
    text: "Home",
    Icon: HomeIcon,
  },
  // {
  //   href: "/subscriptions",
  //   text: "Subscriptions",
  //   Icon: <HomeIcon ,
  // },
  {
    href: "/watchlater",
    text: "Watch later",
    Icon: ClockIcon,
  },

  {
    href: "/liked",
    text: "Liked videos",
    Icon: ThumbsUpIcon,
  },
  {
    href: "/feed/film",
    text: "Films",
    Icon: FilmIcon,
  },

  {
    href: "/feed/sports",
    text: "Sports",
    Icon: TrophyIcon,
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
    href: "/feed/education",
    text: "Education",
    Icon: LightbulbIcon,
  },
  {
    href: "/help",
    text: "Help Center",
    Icon: HelpCircleIcon,
  },
  {
    href: "/settings",
    text: "Settings",
    Icon: SettingsIcon,
  },
];
