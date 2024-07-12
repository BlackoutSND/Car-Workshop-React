import React from 'react'
import liveFeed from "../../assets/Images/hardWork.webp"
import './HardWorkPage.css'

type Props = {}

const HardWorkPage = (props: Props) => {
  return (
    <div className='hard-image  text-start'>
        <div className="dot p-1"><span className="live-feed strokeme p-5 ">Live feed</span></div>
        <img className='the-span' src={liveFeed}></img>
    </div>
  )
}

export default HardWorkPage