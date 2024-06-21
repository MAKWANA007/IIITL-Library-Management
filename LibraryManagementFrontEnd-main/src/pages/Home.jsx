import React, { useState, useEffect } from 'react'
import HeaderSlider from '../components/HeaderSlider'
import { useNavigate } from 'react-router-dom'
import ShoeCarousel from '../components/ShoeCarousel'
import axios from 'axios'

const Home = () => {

    const [shoesData, setShoesData] = useState()


    const getAllData = async () => {
        try {  
            const res = await axios.get("/api/books");
            const data = res.data;
            
            setShoesData(data)
        } catch (err) {
            console.error(err)
        }
    }
    
    const navigate  = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('userName')) {
          if (localStorage.getItem('userName') === 'admin@iiitl.ac.in') {
            navigate("/admin")
          }
        }
      }, [])

    useEffect(() => {
        getAllData()
    }, [])

    return (
        <div>
            <header className='slider'>
                <HeaderSlider />
            </header>
            <main>
                <ShoeCarousel heading={'SCIENCE'} shoesData={shoesData?.filter(item => item.category === 'Science')} />
                <ShoeCarousel heading={'MATHEMATICS'} shoesData={shoesData?.filter(item => item.category === 'Mathematics')} />
                <ShoeCarousel heading={'PROGRAMMING'} shoesData={shoesData?.filter(item => item.category === 'Programming')} />
                
            </main>
        </div>
    )
}

export default Home
