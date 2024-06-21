import React, { useEffect, useState } from 'react'
import FootwearCategorySidebar from '../components/FootwearCategorySidebar'
import ShoeBox from '../components/ShoeBox'
import { BsFilter } from 'react-icons/bs'
import { useNavigate, useQuery, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import SearchForm from '../components/SearchForm'
import { ToastContainer, toast } from 'react-toastify'

const Footwear = () => {

  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem('userName')) {
      if (localStorage.getItem('userName') === 'admin@iiitl.ac.in') {
        navigate("/admin")
      }
    }
  }, [])

  
  const [clearFilters, setClearFilters] = useState(0)
    const [shoesData, setShoesData] = useState()
    const [filterShoesData, setFilterShoesData] = useState([])
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

    const [searchParams] = useSearchParams();

    const getDataBySearch = async (data) => {

      const key = Object.keys(data)[0]
      try {
        const res = await axios.get(`/api/books/search?${key}=${data[key].split("%20").join("+")}`)        
        setShoesData(res.data);
      } catch (err) {
        console.error(err)
      }
    }

    const getAllBooks = async () => {
      try {
        const res = await axios.get("/api/books")
        setShoesData(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    useEffect(() => {
      if ([...searchParams.entries()].length === 0) {
        getAllBooks()
      }

      for (const [key, value] of searchParams.entries()) {
        getDataBySearch({[key]: value})
      }
      
    }, [searchParams])


    const notifyToastEmptySearch = () => {
      toast.error('Please enter some search text', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
      })
  }

    useEffect(() => {
      if (isMobileFilterOpen) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "unset"
      }
    }, [isMobileFilterOpen])

  return (
    <main className='footwear-main'>      
      <FootwearCategorySidebar isMobileFilterOpen={isMobileFilterOpen} setIsMobileFilterOpen={val => setIsMobileFilterOpen(val)} setFilterShoesData={(val) => setFilterShoesData(val)} shoesData={shoesData} clearFilters={clearFilters}  />
      
      <div className="footwear-content">
      <ToastContainer
                    position='top-right'
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    className="toast-notification"
                />
        <SearchForm notifyToastEmptySearch={() => notifyToastEmptySearch()} getDataBySearch={val => getDataBySearch(val)} setClearFilters={val => setClearFilters(val)} />
        {shoesData?.length === 0 ? <p className='no-products'>No books found for this search criteria</p> : 
        (<div className='footwear-container'>
          {filterShoesData.length > 0 ? filterShoesData.map((item, index) => (
              <ShoeBox key={index} shoeItem={item} />
          )) : 
          shoesData?.map((item, index) => (
              <ShoeBox key={index} shoeItem={item} />
          ))}
      </div>) }
      </div>
    <div className="mobile-toggle-filter" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
            <button> FILTER </button>
            <BsFilter className='filter-icon' />
        </div>
    </main>
  )
}

export default Footwear