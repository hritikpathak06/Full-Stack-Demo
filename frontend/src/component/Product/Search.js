import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("")

    const searchSubmitButton = (e) => {
        e.preventDefault();
     if(keyword.trim()){
        navigate(`/products/${keyword}`)
     }else{
        navigate(`/products`)
     }
    }
    return (
        <>
            <form action="" className="searchBox" onSubmit={searchSubmitButton}>
                <input type="text"
                    placeholder='Search a product'
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value={"Search"} />
            </form>
        </>
    )
}

export default Search
