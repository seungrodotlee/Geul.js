import { ComponentProps, useMemo } from "react";
import classNames from "classnames";
import Header from "./Header";
import { Link, graphql, useStaticQuery } from "gatsby";
import { refineProps } from "../../utils";
import { entries, groupBy, pipe, reduce, split, toArray } from "@fxts/core";
import { P, match } from "ts-pattern";
import Collapsible from "../display/Collapsible";

type Node = {
  id: string;
  frontmatter: {
    title: string;
    slug: string;
  };
};

type ContentsQuery = {
  allMdx: {
    nodes: Node[];
  };
};
type Page = Record<"id" | "title" | "slug", string>;

type Categories = Record<
  string,
  {
    index: Page;
    pages: Page[];
  }
>;

const splitIfSlashIncluded = (title: string) => {
  return match(title)
    .with(P.string.includes("/"), () => [...split("/", title)])
    .otherwise(() => [title]);
};

const accumulatePageToCategories =
  (result: Categories, id: string, slug: string) =>
  ([category, splittedTitle]: string[]) => {
    return match(splittedTitle)
      .returnType<Categories>()
      .with(P.union(P.nullish, "index"), () => ({
        ...result,
        [category]: {
          index: { id, title: category, slug },
          pages: result[category]?.pages || [],
        },
      }))
      .otherwise(() => ({
        ...result,
        [category]: {
          index: result[category]?.index,
          pages: [
            ...(result[category]?.pages || []),
            { id, title: splittedTitle, slug },
          ],
        },
      }));
  };

const categoriesAccumulator = (
  result: Categories,
  { id, frontmatter: { slug, title } }: Node,
) => {
  return pipe(
    title,
    splitIfSlashIncluded,
    accumulatePageToCategories(result, id, slug),
  );
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

  const categories = useMemo(
    () =>
      pipe(
        reduce<Node, Categories>(categoriesAccumulator, {}, data.allMdx.nodes),
        entries,
        toArray,
      ),
    [data],
  );

  return (
    <div
      className={classNames("min-w-36 h-full p-2", className)}
      {...refineProps(props)}
    >
      <div className="h-full pl-4 pr-8 py-4 bg-neutral-100 rounded-sm">
        <Header className="mb-16" />
        <div className="text-neutral-500">
          {categories.map(([categoryName, { index, pages }]) => (
            <div key={categoryName}>
              {pages.length === 0 ? (
                <div className="flex">
                  <div className="flex justify-center items-center w-3 mr-2">
                    <div className="w-1 h-1 rounded-full bg-neutral-300"></div>
                  </div>
                  <Link to={index.slug}>{index.title}</Link>
                </div>
              ) : (
                <Collapsible>
                  <Collapsible.Head to={index.slug}>
                    {index.title}
                  </Collapsible.Head>
                  <Collapsible.Details>
                    {pages.map(({ id, title, slug }) => (
                      <Link key={id} to={slug}>
                        {title}
                      </Link>
                    ))}
                  </Collapsible.Details>
                </Collapsible>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
