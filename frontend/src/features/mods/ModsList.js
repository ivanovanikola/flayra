import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useGetModsQuery } from '../api/apiSlice'



export const ModsList = () => {

  const { data: mods = [] } = useGetModsQuery()
 

  const renderedMods = mods.map((mod) => (
      <Nav.Link key={mod.slug} as="li" >
        <Link to={`/mods/${mod.slug}`} style={{color: '#010101'}}>
         {mod.name}
        </Link>
      </Nav.Link >
  ))

  return (
    <>
      {renderedMods}
    </>
  )
}



