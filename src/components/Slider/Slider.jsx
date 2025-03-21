import './Slider.css'

import { selectSlides } from '../../store/slices/slider/sliderSlice'

import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Slider() {
  const [ index, setIndex ] = useState(0)
  const slides = useSelector(selectSlides)

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1)
    }, 2500)
    const lastIndex = slides?.length - 1
    if (index < 0) {
      setIndex(lastIndex)
    }
    if (index > lastIndex) {
      setIndex(0)
    }
    return () => clearInterval(slider)
  }, [ index, slides ])

  return (
    <div className='slider'>
      {
        slides?.map((e, i) => {
          const { id, img } = e
          let position = "next-slide"
          if (i === index) {
            position = "active-slide"
          }
          if (
            i === index - 1 || (index === 0 && i === slides?.length - 1)
          ) {
            position = "last-slide"
          }

          return (
            <Fragment key={id}>
              <div className='arrows-container'>
                <span onClick={() => setIndex(prevIndex => (prevIndex - 1 + slides?.length) % slides?.length)} className='arrow-span'>
                  <i className='fa-solid fa-angle-left'></i>
                </span>
                <span onClick={() => setIndex(prevIndex => (prevIndex + 1) % slides?.length)} className='arrow-span'>
                  <i className='fa-solid fa-angle-right'></i>
                </span>
              </div>
              <article className={position}>
                <div className='dots'>
                  {
                    slides?.map((_, dotIndex) => 
                      <div key={dotIndex} onClick={() => setIndex(dotIndex)} className={`${dotIndex === index ? 'dot2' : 'dot1'}`}></div>
                    )
                  }
                </div>
                <img src={img} className="slider-img" alt="" />
              </article>
            </Fragment>
          )
        })
      }
    </div>
  )
}

export default Slider