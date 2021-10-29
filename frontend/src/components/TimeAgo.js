import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export const LastPublish = ({ date, color }) => {

  return (
    
      <ReactTimeAgo style={{color: `${color}` }} date={Date.parse(date)} locale="ru-RU"/>
    
  )
}