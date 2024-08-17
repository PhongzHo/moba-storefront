"use client"

import React from "react"
import { InstantSearch } from "react-instantsearch-hooks-web"
import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import Hit from "@modules/search/components/hit"
import Hits from "@modules/search/components/hits"
import SearchBox from "@modules/search/components/search-box"
import { MagnifyingGlassMini } from "@medusajs/icons"

export default function SearchNav() {
    return (
        <>
            <div>
                <InstantSearch
                    indexName={SEARCH_INDEX_NAME}
                    searchClient={searchClient}
                >
                    <div
                        className="absolute flex w-full flex-col sm:w-fit"
                        data-testid="search-modal-container"
                    >
                        <div className="flex w-3/4 items-center gap-x-2 rounded-full bg-[rgba(3,7,18,0.5)] p-2 text-ui-fg-on-color backdrop-blur-2xl">
                            <MagnifyingGlassMini />
                            <SearchBox />
                        </div>
                        <div className="mt-3 flex-1">
                            <Hits hitComponent={Hit} />
                        </div>
                    </div>
                </InstantSearch>
            </div>
        </>
    )
}
