import './Home.css'

import Slider from '../../components/Slider/Slider'
import HomeSection from '../../components/HomeSection/HomeSection'
import RecomendedBooks from '../../components/RecomendedBooks/RecomendedBooks'
import SomeBooks from '../../components/SomeBooks/SomeBooks'

import { useLayoutEffect } from 'react'

function Home() {
  useLayoutEffect(() => {
    scrollTo(0, 0)
  }, [])

  return (
    <div className='home'>
      <Slider/>
      <RecomendedBooks/>
      <SomeBooks/>
      <HomeSection/>
    </div>
  )
}

export default Home