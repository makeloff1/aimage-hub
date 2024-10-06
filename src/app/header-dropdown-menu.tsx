"use client"

import * as React from "react"
import { AlignJustify } from 'lucide-react';

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ModeToggle from "./theme-toggle";

export default function HeaderDropdownMenu() {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-transparent text-white hover:bg-opacity-20 hover:bg-gray-200 rounded-full" size="icon">
                    <AlignJustify />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    AAA
                </DropdownMenuItem>
                <DropdownMenuItem>
                    BBB
                </DropdownMenuItem>
                <div className="relative flex items-center rounded-sm px-2 py-1.5 text-sm outline-none">
                    <ModeToggle />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

