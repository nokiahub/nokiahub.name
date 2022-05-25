import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return(
    <Layout location={location} title={siteTitle}>
      <Seo
        title={siteTitle}
        description={siteTitle}
      />
      <p>안녕하세요. 프론트엔드 개발자 정형주입니다.</p>
      <p>tbd</p>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default About;