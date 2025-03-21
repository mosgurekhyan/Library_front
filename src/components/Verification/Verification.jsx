import './Verification.css'

import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyEmail, resendEmail } from '../../store/slices/auth/authAPI'
import { useNavigate } from 'react-router-dom'
import { selectTemporaryEmail } from '../../store/slices/auth/authSlice'

function Verification() {
  const [ isComplete, setIsComplete ] = useState(false) 
  const [ seconds, setSeconds ] = useState(60)
  const [ err, setErr ] = useState(null) 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const show = useSelector(selectTemporaryEmail)

  useEffect(() => {
    const interval = setInterval(() => {
      if (show && seconds > 0) {
        setSeconds(seconds => seconds - 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [ show, seconds ])

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ]

  useEffect(() => {
    inputRefs[0]?.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkInputsFilled = () => {
    const allFilled = inputRefs.every(ref => ref.current?.value.length > 0)
    setIsComplete(allFilled)
  }

  const focusNextInput = index => {
    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus()
    }
  }

  const focusPrevInput = index => {
    if (index > 0) {
      inputRefs[index - 1].current.focus()
    }
  }

  const handleInputChange = (e, index) => {
    let value = e.target.value  
    value = value.replace(/[^\d]/g, '')  

    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    e.target.value = value
    checkInputsFilled()

    if (value === '') {
      focusPrevInput(index)
    } else {
      if (index < inputRefs.length - 1) {
        focusNextInput(index)
      }
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && inputRefs[index].current.value === '') {
      e.preventDefault()
      focusPrevInput(index)
    }
  }

  const handleSubmit = () => {
    const otp = inputRefs.map(ref => ref.current.value).join("")
    if (isComplete) {
      dispatch(verifyEmail({ otp, setErr, navigate }))
    }
  }  

  return (     
    <div className='verification'>
      <div className="verification_container">
        <p className="verification_timer">{seconds}</p>
        <p className='verification_order'>Type otp</p>
        <div className="verification_numbers">
          {
            inputRefs.map((ref, i) => 
              <input 
                key={i} 
                onKeyDown={e => handleKeyDown(e, i)} 
                type="number" 
                id={`ver${i}`} 
                className="verification_input" 
                ref={ref} 
                onChange={e => handleInputChange(e, i)}
              />
            )
          }
          { err && <p className="verification_error">{err}</p> }
        </div>
        <button onClick={handleSubmit} className={`verification_btn ${isComplete && 'visibility'}`}>confirm</button>
        { seconds === 0 && <button onClick={() => dispatch(resendEmail({ setSeconds, inputRefs, setIsComplete, setErr }))} className='verification_resend'>{'resend'}</button> }
      </div>
    </div>
  )
}

export default Verification