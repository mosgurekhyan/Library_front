import './HomeSection.css'
import video from '../../assets/videos/dimord.mp4'

import { useRef, useState } from 'react'

function HomeSection() {
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ isHovered, setIsHovered ] = useState(false)
  const videoRef = useRef(null)

  const togglePlayback = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className='home_section'>
      <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="home_section_video_container">
        <video ref={videoRef} src={video} className="home_section_video"></video>
        {
          (isHovered || !isPlaying) &&
          <i onClick={togglePlayback} className={`video_btn fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        }
      </div>
      <p className="home_section_text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt a cumque accusamus dicta soluta, ut, iusto expedita velit laborum unde molestiae reiciendis officiis porro saepe accusantium deleniti hic, nam perspiciatis laboriosam? Ab ut mollitia maiores facere ipsa quibusdam corporis, expedita laborum! Alias, ea. Illo aliquam aperiam et impedit eos sed consectetur unde aliquid explicabo vero! Suscipit voluptas, harum ipsa iusto esse nulla ullam quisquam quis eaque repellat! Doloremque cumque sequi magnam sunt illum similique error id, iusto consectetur minima totam reprehenderit quasi velit esse explicabo sed consequuntur atque quae ratione odit! Cupiditate in ipsum illo. Esse, in similique fugiat minima dolor, dignissimos aperiam ratione nobis nostrum odit odio non! Beatae repellendus laudantium labore quam maxime, tempora esse porro consequuntur, numquam ducimus veritatis quo autem reiciendis ullam necessitatibus aperiam dolores dicta rerum. Repudiandae ad cupiditate harum ex velit deleniti delectus, incidunt reiciendis illum perspiciatis reprehenderit fugiat a animi eligendi, voluptatibus corporis modi officiis neque. Reprehenderit molestiae quidem sequi culpa quisquam eligendi eaque laboriosam provident ratione harum, animi, omnis doloremque ex inventore quam, unde beatae? Fugit nam asperiores illum quo tempora quidem laboriosam ex nemo assumenda aperiam! Perspiciatis, voluptatem. Ex repellat similique odit iure enim, velit assumenda odio ipsa, aliquam fuga porro.</p>
    </div>
  )
}

export default HomeSection