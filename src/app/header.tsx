import React from "react"
import HeaderDropdownMenu from "./header-dropdown-menu";
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Header = () => {
    return (
        <div className="flex items-center justify-start h-16">
            <h2 className="ml-4 text-2xl font-bold flex-shrink-0">
                HentAI Hub
            </h2>
            <div className="flex mx-4 w-full items-center justify-center flex-shrink bg-red-200">
                {/* PC・大きいタブレットの場合は検索欄 */}
                <div className="invisible md:visible md:w-64 bg-blue-200">
                    <span> </span>
                </div>
            </div>
            <div className="ml-auto flex mr-2 space-x-2 items-center justify-end flex-shrink-0">
                {/* モバイル・タブレットの場合は、検索は虫眼鏡アイコン */}
                <div className="visible md:invisible">
                    <Button variant="ghost" size="icon">
                        <Search />
                    </Button>
                </div>
                <Button variant="link" className="text-xs px-0" size="sm">
                    ランキング
                </Button>
                <Button variant="link" className="text-xs px-0" size="sm">
                    マイページ
                </Button>
                <HeaderDropdownMenu />
            </div>
        </div>
    )
}