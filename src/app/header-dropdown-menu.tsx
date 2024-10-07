"use client";

import { AlignJustify } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModeToggle from "./theme-toggle";

export default function HeaderDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <AlignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="relative flex items-center rounded-sm px-2 py-1.5 text-sm outline-none">
          <ModeToggle />
        </div>
        {/* TODO: ログイン時にはログアウト、ログアウト時にはログインを表示 */}
        <DropdownMenuItem>ログイン</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
