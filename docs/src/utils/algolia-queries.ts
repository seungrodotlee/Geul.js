import escapeStringRegexp from "escape-string-regexp";

const pagePath = `content`
const indexName = `Pages`

const pageQuery = `{
  pages: allMdx(
    filter: {
      internal: {
        contentFilePath: {
          regex: "/${escapeStringRegexp(pagePath)}/"
        }
      }
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          slug
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

function pageToAlgoliaRecord({ node: { id, frontmatter, ...rest } }: any) {
  return {
    objectID: id,
    ...frontmatter,
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }: any) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

export default queries