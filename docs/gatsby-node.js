const path = require("path");
const layout = path.resolve(`./src/components/layout/MDXLayout.tsx`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors);
  }

  // Create blog post pages.
  const posts = result.data.allMdx.nodes;

  // you'll call `createPage` for each result
  posts.forEach((node) => {
    createPage({
      path: node.frontmatter.slug,
      component: `${layout}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@geul/react": path.resolve(
          __dirname,
          "../packages/react/src/index.ts",
        ),
      },
    },
  });
};


exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "@babel/plugin-transform-react-jsx",
    options: {
      runtime: "automatic",
    },
  });
};
