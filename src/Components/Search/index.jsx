import React from 'react';

const Search = ({setWord}) => {
    return (
        <div>
            <input id="search" onChange={(e) => setWord(e.target.value)} type="text" placeholder="Поиск"/>
        </div>
    );
};

export default Search;