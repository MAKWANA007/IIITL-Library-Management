import React, { useEffect, useState } from 'react'
import ShoeBox from './ShoeBox'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SlickArrowNext from './SlickArrowNext'
import SlickArrowPrev from './SlickArrowPrev'
import { Link } from 'react-router-dom'

const ShoeCarousel = ({ heading, shoesData }) => {

    const [shoeList, setShoeList] = useState()

    useEffect(() => {
        if (shoesData) {
            let list
            if (heading === 'TOP SELLING') {
                list = shoesData.sort((d1, d2) => d2.sales - d1.sales).slice(0,10)
            } else {
                list = shoesData.sort((d1, d2) => d2.date - d1.date).slice(0,10)
            }

            setShoeList(list)
        }
    }, [shoesData, heading])

    const settings = {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: false,
        nextArrow: <SlickArrowNext />,
        prevArrow: <SlickArrowPrev />,
        responsive: [
            {
                breakpoint: 825,
                settings: {
                    slidesToShow: 3,
                    dots: true,
                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 2,
                    dots: true,
                },
            },
        ],
    }

    return (
        <section>
            <Link to={`/books?category=${heading[0] + heading.substring(1).toLowerCase()}`} className='link'> <h2>{heading}</h2> </Link>
            <Slider {...settings}>
                {shoeList?.map((shoeItem, index) => (
                    <ShoeBox key={index} shoeItem={shoeItem} />
                ))}
                {shoeList ? null : <p className='temp-slider-adjust'></p>}
            </Slider>
        </section>
    )
}

export default ShoeCarousel
