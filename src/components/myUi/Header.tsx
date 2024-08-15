import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSidebarMenu } from "@/redux/sidebarSlice";
import { updateSearchQuery } from "@/redux/searchSlice";
import { autoSuggestionsUrl } from "@/constants";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

// Icons
import {
  MenuIcon,
  SearchIcon,
  VideoIcon,
  MicIcon,
  BellIcon,
  PlusSquare,
  CirclePlayIcon,
  HomeIcon,
  PlaySquareIcon,
  PlusCircleIcon,
} from "lucide-react";

import ProfileButton from "./ProfileButton";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";

// Types
import { Links } from "@/components/myUi/Sidebar";

const Header = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestionList, setSuggestionList] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(-1);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toggleMenu = () => {
    dispatch(toggleSidebarMenu());
  };

  useEffect(() => {
    // Make an API call after every keypress
    // But if the difference between multiple keypresses is < 200ms, decline the API call
    // This is called debouncing
    const timer = setTimeout(() => showSearchSuggestions(), 200);

    return () => {
      clearInterval(timer);
    };
  }, [searchText]);

  const showSearchSuggestions = async () => {
    const data = await fetch(autoSuggestionsUrl + searchText);
    const json = await data.json();
    setSuggestionList(json[1]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      const currentSuggestion = selectedSuggestion + 1;
      if (currentSuggestion < suggestionList.length) {
        setSelectedSuggestion(currentSuggestion);
      }
    } else if (e.key === "ArrowUp") {
      const currentSuggestion = selectedSuggestion - 1;
      if (currentSuggestion >= 0) {
        setSelectedSuggestion(currentSuggestion);
      }
    } else if (e.key === "Enter") {
      if (selectedSuggestion < 0) {
        handleSearch(searchText);
      } else {
        handleSearch(suggestionList[selectedSuggestion]);
      }
    }
  };

  const handleSearch = (searchQuery: string) => {
    dispatch(updateSearchQuery(searchQuery));
    navigate("/results?search_query=" + searchQuery);
    setSearchText("");
    setSelectedSuggestion(-1);
  };

  return (
    <nav className="flex items-center justify-between  px-6 py-2 w-[100%] sticky bg-background  top-0   ">
      <div className="flex items-center gap-3">
        <MenuIcon onClick={toggleMenu} className="md:block hidden " />
        <Link to="/" className="flex items-center gap-1 ">
          <VideoIcon />
          <h1 className="font-bold text-lg md:text-2xl">shadTube</h1>
        </Link>
      </div>
      <div className="relative w-[50%]">
        <div className="flex items-center">
          <Input
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            onKeyDown={(e) => handleKeyPress(e)}
            className="w-[90%] hidden md:block rounded-l-2xl focus-visible:ring-offset-0 focus-visible:ring-blue-800 rounded-r-0  focus-visible:ring-1"
          />
          <Button
            className="rounded-r-full px-5 hidden md:block"
            aria-label="search"
            variant={"secondary"}
          >
            <SearchIcon onClick={() => handleSearch(searchText)} className="" />
          </Button>

          <Button
            className={"ml-6 rounded-full p-3 hidden md:block"}
            variant={"secondary"}
          >
            <MicIcon />
          </Button>
        </div>
        {showSuggestions && suggestionList.length > 0 && (
          <div className="py-2 mx-1 rounded-lg shadow-xl absolute w-full bg-white z-10 border border-solid border-gray-300">
            <ul>
              {suggestionList.map((suggestion, index) => (
                <li
                  key={index}
                  className={`p-2 ${
                    selectedSuggestion === index ? "bg-gray-200" : ""
                  }`}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex gap-4 items-center">
        <SearchIcon
          onClick={() => handleSearch(searchText)}
          className="md:hidden block"
        />

        <ModeToggle />
        <Button className={" rounded-full p-3"} variant={"ghost"}>
          <PlusSquare />
        </Button>
        <Button className={" rounded-full p-3"} variant={"ghost"}>
          <BellIcon />
        </Button>

        <ProfileButton className="hidden md:block" />
      </div>
    </nav>
  );
};

export default Header;

export const Bottombar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>(
    window.location.pathname
  );
  const location = useLocation();

  useEffect(() => {
    setSelectedTab(location.pathname);
  }, [location.pathname]);

  return (
    <div className="w-full md:hidden flex gap-4 justify-center fixed items-center bg-background bottom-1 border-t p-3 font-light">
      {mobileLinks.map((link, i) => (
        <>
          {i === 2 && <PlusCircleIcon className="size-14" />}
          <NavLink
            to={link.href}
            key={i}
            onClick={() => setSelectedTab(link.href)}
            className={`flex flex-col w-fit  items-center  ${
              selectedTab === link.href && "font-extrabold text-lg"
            }`}
          >
            <link.Icon />
            {link.text}
          </NavLink>
        </>
      ))}
      <div className="flex flex-col items-center ">
        <ProfileButton />
        You
      </div>
    </div>
  );
};

let mobileLinks: Links[] = [
  {
    text: "Home",
    href: "/",
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
];
