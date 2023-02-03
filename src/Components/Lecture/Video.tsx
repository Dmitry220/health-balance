import React, { FC } from 'react'

interface IVideo {
  url: string
}

export const Video: FC<IVideo> = ({ url }) => {
  
  return (
    <div className='lecture__video'>
      <iframe
        src={url}
        //frameborder="0"
      ></iframe>
    </div>
  )
}
