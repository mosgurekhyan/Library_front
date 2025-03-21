import './Footer.css'

import ROUTES from '../../routes/routes'

import { useNavigate } from "react-router-dom"
import { FOOTER_ITEMS } from '../../constants/footerItems'

function Footer() {
  const navigate = useNavigate()

  return (
    <footer>
      <div className="footer-container1">
        <div className='footer-container1-list'>
          <p className='footer-container1-list_title'>Կապ մեզ հետ</p>
          <a className='footer-container1-list_link' href="tel:+1234567890"><i className="fa-solid fa-phone footer-container1-list_icon"></i>+37491347149</a>
          <a className='footer-container1-list_link' href="mailto:platformorientation@gmail.com"><i className="fa-solid fa-envelope footer-container1-list_icon"></i>erevanreu@gmail.com</a>
        </div>
        <div className='footer-container1-list'>
          <p className='footer-container1-list_title'>Մեր մասին</p>
          <button onClick={() => navigate(ROUTES.ABOUT)} className='footer-container1-list_link'>Մեր մասին</button>
          <button onClick={() => navigate(ROUTES.CONTACT)} className='footer-container1-list_link'>Կապ մեզ հետ</button>
        </div>
      </div>
      <div className="footer-intermediate_container">
        <div className="footer-container1-list_websites">
          {
            FOOTER_ITEMS.map(e => 
              <a href={e.link} key={e.id} target="_blank" rel="noopener noreferrer" className="footer-container1-list_websites_wrapper">
                <i className={`fa-brands fa-${e.icon} footer-container1-list_website_icon`}></i>
              </a>
            )
          }
        </div>
      </div>
      <div className="footer-container2">
        <span className='footer-container2_text text_color'>Ստեղծվել է <p className='developer_name'>Լենա Հարությունյանի</p> կողմից 2025թ.</span>
      </div>
    </footer>
  )
}

export default Footer