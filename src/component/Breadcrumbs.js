import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location=useLocation();
    // --/help/contact ----->help | contact
    let currentLink="";
    const crumbs=location.pathname.split("/")
    const path=crumbs.filter(crumb=>crumb!=="")
    const pathnames=path.map((crumb)=>{
        currentLink=+`/${crumb}`
        return(
            <div key={crumb}>
                <Link to={currentLink}>{crumb}/</Link>
            </div>
        )
    })
  return (
    <div>{pathnames}</div>
  )
}

export default Breadcrumbs;