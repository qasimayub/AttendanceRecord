import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import CategoryDisplay from '../../components/Categories/CategoryDisplay'
import { StoreContext } from '../../contexts/storeContext'
const Home = () => {
    const [category, setCategory] = useState('All');
    const {loadData} = useContext(StoreContext)
    useEffect(()=> {
      loadData()
    }, [])
  return (
    <div className='home'>
        <Header/>
        <CategoryDisplay category={category}/>
    </div>
  )
}

export default Home