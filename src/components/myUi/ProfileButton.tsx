import React from "react";
import { cn } from "@/lib/utils";

//import Icons
//shadcn  components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Icons
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings } from "lucide-react";

// context

const ProfileButton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(className)}>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
          <AvatarImage src={""} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel></DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2 cursor-pointer"></DropdownMenuItem>
        <DropdownMenuItem></DropdownMenuItem>

        <DropdownMenuItem className="gap-2 cursor-pointer">
          <Settings /> Account Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 cursor-pointer">
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
