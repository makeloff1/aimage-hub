import React from "react"
import HeaderDropdownMenu from "./header-dropdown-menu";

export const Header = () => {
    return (
        <div className="flex items-center justify-start h-10 bg-gray-600">
            <h2 className="ml-4 text-lg font-semibold">Playground</h2>
            <div className="flex w-full items-center justify-center bg-gray-200">
                <span>XXX</span>
            </div>
            <div className="flex mr-2 space-x-2 items-center justify-end bg-red-200">
                <span>aaa</span>
                <span>bbb</span>
                <div className="hidden space-x-2 md:flex">
                    <span>ccc</span>
                    <span>ddd</span>
                </div>
                <span>eee</span>
                <HeaderDropdownMenu />
            </div>
        </div>
    )
}