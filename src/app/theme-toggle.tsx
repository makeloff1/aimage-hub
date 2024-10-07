"use client"

import { useTheme } from "next-themes"
import { SwitchDarkMode } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const handleSwitchChange = () => {
        setTimeout(() => {
            if (theme === "dark") {
                setTheme("light");
            } else {
                setTheme("dark");
            }
        }, 300); // 300msの遅延
    };

    return (
        <div className="flex items-center space-x-2">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <SwitchDarkMode id="dark-mode"
                className="transition duration-150"
                defaultChecked={theme === "dark" || true}
                onCheckedChange={handleSwitchChange}
            />
        </div>
    )
}

