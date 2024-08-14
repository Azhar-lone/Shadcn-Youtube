import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSidebarMenu } from "@/redux/sidebarSlice";
import { updateSearchQuery } from "@/redux/searchSlice";
import { autoSuggestionsUrl } from "@/constants";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { MenuIcon, SearchIcon, VideoIcon } from "lucide-react";

import ProfileButton from "./ProfileButton";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const Nav = () => {
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
    <nav className="flex items-center justify-between  px-4 py-3 w-full ">
      <div className="flex items-center gap-3">
        <MenuIcon onClick={toggleMenu} />
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
            className="w-[90%] rounded-l-2xl "
          />
          <Button
            className="rounded-r-full px-5"
            aria-label="search"
            variant={"secondary"}
          >
            <SearchIcon onClick={() => handleSearch(searchText)} />
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

      <ProfileButton />
    </nav>
  );
};

export default Nav;
