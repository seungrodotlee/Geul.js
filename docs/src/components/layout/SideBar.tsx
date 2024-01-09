import { ComponentProps } from "react";
import classNames from "classnames";
import Header from "./Header";
import { graphql, useStaticQuery } from "gatsby";
import { refineProps } from "../../utils";

type ContentsQuery = {
  allMdx: {
    nodes: {
      id: number;
      frontmatter: {
        title: string;
        slug: string;
      };
    }[];
  };
};

const SideBar = ({ className, ...props }: ComponentProps<"div">) => {
  const data = useStaticQuery<ContentsQuery>(graphql`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            title
            slug
          }
        }
      }
    }
  `);

  return (
    <div
      className={classNames("h-full p-2", className)}
      {...refineProps(props)}
    >
      <div className="w-32 h-full px-6 py-4 bg-neutral-100 rounded-sm">
        <Header />
        <div>
          {data.allMdx.nodes.map(({ id, frontmatter }) => (
            <div key={id}>
              <a href={frontmatter.slug}>{frontmatter.title}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
