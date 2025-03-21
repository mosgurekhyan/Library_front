import img1 from '../../../assets/images/slide1.jpg'
import img2 from '../../../assets/images/slide2.jpg'
import img3 from '../../../assets/images/slide3.jpg'
import img4 from '../../../assets/images/slide4.jpg'

import { createSlice } from '@reduxjs/toolkit'

const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    slides: [
      {
        id: '1',
        img: img1
      },
      {
        id: '2',
        img: img2
      },
      {
        id: '3',
        img: img3
      },
      {
        id: '4',
        img: img4
      }
    ]
  },
  reducers: {
    setFlag (state, { payload }) {
      state.flag = payload
    }
  }
})

export const selectSlides = state => state.slider.slides

export const { setFlag } = sliderSlice.actions

export const sliderReducer = sliderSlice.reducer