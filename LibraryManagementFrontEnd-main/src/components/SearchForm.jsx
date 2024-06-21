import React from 'react'
import {BsSearch} from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'


const SearchForm = ({ notifyToastEmptySearch, getDataBySearch, setClearFilters }) => {

  const { handleSubmit, register } = useForm()

  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = data => {
    setClearFilters(prev => prev + 1)
    const query = data.query.split(" ").join("+")
    if (data.query === "") {
      notifyToastEmptySearch()
    } else if (location.pathname === '/') {
      navigate(`/books?${data.searchBy}=${query}`)
    } else  {

      getDataBySearch({[data.searchBy]: query})
    }
  }

  return (
    <form className='search-form' onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("query")} name="query" placeholder='Search books...' />
        <select name="searchBy" {...register("searchBy")} id="searchBy" defaultValue={"title"}>
            <option value="title" >Title</option>
            <option value="author">Author</option>
        </select>
        <button type='submit'>
            <BsSearch />
            Search
        </button>
    </form>   
  )
}

export default SearchForm