import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const FootwearCategorySidebar = ({ isMobileFilterOpen, setIsMobileFilterOpen, shoesData, setFilterShoesData, clearFilters }) => {
    
    const [categories, setCategories] = useState([])

    const [initialFlag, setInitialFlag] = useState(0)
    const [footwearCategoryOpen, setFootwearCategoryOpen] = useState([false, false])

    const [activeFilter, setActiveFilter] = useState([])

    const [categoryList, setCategoryList] = useState([])
    const [authorList, setAuthorList] = useState([])
    
    const { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        if (shoesData) {
            getCategories(shoesData)
        }
    }, [shoesData])

    useEffect(() => {
        setActiveFilter([])
    }, [clearFilters])

    useEffect(() => {
        if (shoesData) {
            const authors = new Set()
            const categories = new Set()

            shoesData.forEach(item => {
                authors.add(item.author)
                categories.add(item.category)
            })

            setAuthorList([...authors])
            setCategoryList([...categories])
        }
    }, [shoesData])

    const getCategories = shoesData => {
        let list = []
        shoesData.forEach(item => {
            list.push(item.category)
        })

        setCategories([...new Set(list)])
    }

    const handleCategoryListToggle = index => {
        setFootwearCategoryOpen(prev => prev.map((item, arrIndex) => arrIndex === index ? !item : item))
    }


    const getDataByFilter = filters => {
        let data = []

        filters.forEach(filter => {
            if (categories.includes(filter)) {
                data = [...data, ...shoesData.filter(item => item.category === filter)]
            } else {
                data = [...data, ...shoesData.filter(item => item.author === filter)]
            }
        })

        setFilterShoesData([...new Set(data)])
    }

    useEffect(() => {
        if (initialFlag === 0) {
            setInitialFlag(prev => prev + 1)
        } else {
            if (activeFilter.length === 0) reset()
            getDataByFilter(activeFilter)
        }
    }, [activeFilter])

    const setActiveFilterList = data => {
        let activeFiltersList = []
            Object.values(data).forEach(d => {
                if (d) {
                    if (Array.isArray(d)) activeFiltersList = [...activeFiltersList, ...d]
                    else activeFiltersList = [...activeFiltersList, d]
                } 
            })
        if (activeFilter.join(",") === activeFiltersList.join(",")) {
            return
        }
        setActiveFilter(prev => [...new Set([...prev, ...activeFiltersList])])
    }
    
    const onSubmit = data => {
        setActiveFilterList(data)
        setIsMobileFilterOpen(false)
        reset()
    }

    return (
    <aside className={`footwear-sidebar ${isMobileFilterOpen ? "filter-open" : ""}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <span>FILTER <button type='submit'>Save</button> </span>
        {activeFilter.length > 0 && (
            <ul className='active-filter-list'>
                <button className='filter-clear' onClick={() => setActiveFilter([])}>Clear All</button>
                {activeFilter.map((item, index) => (
                    <li key={index}><span className="active-filter">{item}<AiOutlineClose className='active-filter-icon' onClick={() => setActiveFilter(prev => prev.filter(filterItem => filterItem !== item))} /> </span></li>
                ))}
            </ul>
        )}
        
           
                <div className="footwear-category" >
                    <h2 onClick={() => handleCategoryListToggle(0)}> Author <span> {footwearCategoryOpen[0] ? <AiOutlineMinus className='footwear-h2-icon' /> : <AiOutlinePlus className='footwear-h2-icon' /> } </span> </h2>
                    <ul className={footwearCategoryOpen[0] ? "category-list-open" : ""}>
                        {authorList.map((listItem, index2) => (
                            <li key={index2}>
                                <input type="checkbox" name="author" id={`author-${index2}`} value={listItem} {...register("author")} disabled={activeFilter.includes(listItem)} />
                                <label htmlFor={`author-${index2}`}>{listItem}</label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footwear-category" >
                    <h2 onClick={() => handleCategoryListToggle(1)}> Category <span> {footwearCategoryOpen[1] ? <AiOutlineMinus className='footwear-h2-icon' /> : <AiOutlinePlus className='footwear-h2-icon' /> } </span> </h2>
                    <ul className={footwearCategoryOpen[1] ? "category-list-open" : ""}>
                        {categoryList.map((listItem, index2) => (
                            <li key={index2}>
                                <input type="checkbox" name="category" id={`category-${index2}`} value={listItem} {...register("category")} disabled={activeFilter.includes(listItem)} />
                                <label htmlFor={`category-${index2}`}>{listItem}</label>
                            </li>
                        ))}
                    </ul>
                </div>
           
        </form>
       
    </aside>
  )
}

export default FootwearCategorySidebar