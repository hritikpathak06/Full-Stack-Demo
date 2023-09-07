import React from 'react'
import Helmet from "react-helmet"


const MetaData = ({title, image}) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <img src={image} alt="" />
    </Helmet>
    </div>
  )
}

export default MetaData

