import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>

    
    <CategoryList/>
    <BannerProduct/>
    <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
    <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>
    <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
    <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
    <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
    <VerticalCardProduct category={"camera"} heading={"Camera's & Photography"}/>
    <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
    <VerticalCardProduct category={"speakers"} heading={"High Volume Speakers"}/>
    <VerticalCardProduct category={"refrigerator"} heading={"Refrigerators"}/>
    <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}

export default Home