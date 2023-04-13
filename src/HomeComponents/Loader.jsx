import React from 'react'

const Loader = ({theme}) => {
  return (
    <div className='w-[90vw] h-[90vh] flex items-center justify-center'>
      <div className="typewriter text-center">
        <div className="slide"><i></i></div>
        <div className="paper"></div>
        <div className="keyboard"></div>
        <div className={`${theme === "true" ? "text-base-100" : "text-neutral"} font-medium`}>Loading...</div>
      </div>
    </div>
  )
}

export default Loader