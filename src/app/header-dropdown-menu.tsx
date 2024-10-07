"use client";

import * as React from "react";
import { useTheme } from "next-themes";
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
  const { theme } = useTheme(); // 現在のテーマを取得
  // テーマに基づくテキストカラークラス
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <AlignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>AAA</DropdownMenuItem>
        <DropdownMenuItem>BBB</DropdownMenuItem>
        <div className="relative flex items-center rounded-sm px-2 py-1.5 text-sm outline-none">
          <ModeToggle />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
