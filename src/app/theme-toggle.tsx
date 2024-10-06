"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const handleSwitchChange = (checked: boolean) => {
        console.log("now theme: ", theme)
        if (theme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode"
                // className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-green-100 bg-green-100"
                className="bg-gradient-to-r from-indigo-500"
                defaultChecked={theme === "dark" || true}
                onCheckedChange={handleSwitchChange}
            />
        </div>
    )
}

