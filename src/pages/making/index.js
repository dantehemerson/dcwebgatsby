import React from 'react'
import get from 'lodash/get'

import SEO from '../../components/SEO'
import Wrapper from '../../components/Wrapper'
import Banner, { Title, Description } from '../../components/Banner'
import Grid from '../../components/Grid'
import Card from '../../components/Card'

class ProjectsIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Wrapper wide>      
        <SEO title="Projects" />
        <Banner>
          <Title>Proyectos</Title>
          <Description>Aqui algunos de mis trabajos</Description>
        </Banner>
        <Grid width="16em" mb={3} gap="1em">
          {posts.map(({ node }) => {
            return (
              <Card
                key={node.id}
                half={true}
                slug={node.fields.slug}
                cover={get(node, 'frontmatter.cover.childImageSharp.sizes')}
                title={get(node, 'frontmatter.title') || node.fields.slug}
                subtitle={get(node, 'frontmatter.subtitle')}
                category={get(node, 'frontmatter.category')}
                type={get(node, 'frontmatter.type')}
                date={get(node, 'frontmatter.date')}
              />
            )
          })}
        </Grid>
      </Wrapper>
    )
  }
}

export default ProjectsIndex

export const pageQuery = graphql`
  query ProjectsIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { model: { eq: "project" }, draft: { ne: true } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            cover {
              childImageSharp {
                sizes(traceSVG: { background: "#ced9e0", color: "#738694" }) {
                  ...GatsbyImageSharpSizes_withWebp_tracedSVG
                }
              }
            }
            model
            category
            type
            date(formatString: "MMM YYYY")
          }
        }
      }
    }
  }
`
