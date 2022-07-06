import * as React from "react"
import { Link } from 'gatsby'

const Pagination = ({ totalPages }) => {
  const items = Array.from(Array(totalPages).keys())

  return (
    <ul>
      {items.map((_, index) => (
        <Link
          key={index}
          to={index === 0 ? '/' : `/${index + 1}`}
        >{index + 1}</Link>
      ))}
    </ul>
  )
}

export default Pagination
