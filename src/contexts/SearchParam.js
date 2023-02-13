import React, { useState} from "react";

export const SearchContext = React.createContext();

export function SearchProvider ({ children }) {
    const [query, setQuery] = useState("");

    let value =[query, setQuery];


    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

