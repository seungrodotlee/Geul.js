import { ComponentProps, useMemo } from "react";
import classNames from "classnames";
import Logo from "./logo";
import { Link, graphql, navigate, useStaticQuery } from "gatsby";
import { refineProps } from "../../utils";
import {
  entries,
  groupBy,
  map,
  pipe,
  prepend,
  reduce,
  split,
  tap,
  toArray,
} from "@fxts/core";
import { P, match } from "ts-pattern";
import Collapsible from "../display/collapsible";

type RawIndex = {
  standalone: string | null;
  category: string | null;
  pages: string[] | null;
};

type ContentsIndexQuery = {
  allYaml: {
    edges: {
      node: {
        index: RawIndex[];
      };
    }[];
  };
};

type RawContent = {
  id: string;
  frontmatter: {
    title: string;
    slug: string;
  };
};

type ContentsQuery = {
  allMdx: {
    nodes: RawContent[];
  };
};

type Page = Record<"id" | "title" | "slug", string>;

type MappedCategories = Record<
  string,
  {
    overview: Page;
    pages: Record<string, Page>;
  }
>;

class Standalone {
  standalone: Page;

  constructor(standalone: Page) {
    this.standalone = standalone;
  }
}

class Category {
  category: string;
  pages: Page[];

  constructor(category: string, pages: Page[]) {
    this.category = category;
    this.pages = pages;
  }
}

const splitIfSlashIncluded = (title: string) => {
  return match(title)
    .with(P.string.includes("/"), () => [...split("/", title)])
    .otherwise(() => [title]);
};

const accumulatePageToCategories =
  (result: MappedCategories, id: string, slug: string) =>
  ([category, splittedTitle]: string[]) => {
    return match(splittedTitle)
      .returnType<MappedCategories>()
      .with(P.union(P.nullish, "overview"), () => ({
        ...result,
        [category]: {
          overview: { id, title: splittedTitle ?? category, slug },
          pages: result[category]?.pages || {},
        },
      }))
      .otherwise(() => ({
        ...result,
        [category]: {
          overview: result[category]?.overview,
          pages: {
            ...(result[category]?.pages || {}),
            [splittedTitle]: { id, title: splittedTitle, slug },
          },
        },
      }));
  };

const categoriesAccumulator = (
  result: MappedCategories,
  { id, frontmatter: { slug, title } }: RawContent,
) => {
  return pipe(
    title,
    splitIfSlashIncluded,
    accumulatePageToCategories(result, id, slug),
  );
};

const categoriesMapper =
  (accumulated: MappedCategories) => (standaloneOrCategory: RawIndex) => {
    return match(standaloneOrCategory)
      .returnType<Standalone | Category>()
      .with(
        { standalone: P.string },
        ({ standalone }) => new Standalone(accumulated[standalone].overview),
      )
      .with(
        { category: P.string, pages: P.array(P.string) },
        ({ category, pages }) =>
          new Category(
            category,
            pipe(
              pages,
              map((page) => accumulated[category].pages[page]),
              (mappedPages) =>
                accumulated[category].overview
                  ? prepend(accumulated[category].overview, mappedPages)
                  : mappedPages,
              toArray,
            ),
          ),
      )
      .run();
  };

const getOrderedCategories =
  (index: RawIndex[]) => (accumulated: MappedCategories) => {
    return pipe(index, map(categoriesMapper(accumulated)), toArray);
  };

const SideBar = ({ className, ...props }: ComponentProps<"div">) => {
  const data = useStaticQuery<ContentsIndexQuery & ContentsQuery>(graphql`
    query {
      allYaml {
        edges {
          node {
            index {
              standalone
              category
              pages
            }
          }
        }
      }

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

  const categories = useMemo(() => {
    return pipe(
      reduce<RawContent, MappedCategories>(
        categoriesAccumulator,
        {},
        data.allMdx.nodes,
      ),
      getOrderedCategories(data.allYaml.edges[0].node.index),
    );
  }, [data]);

  return (
    <div
      className={classNames("min-w-36 h-full p-2", className)}
      {...refineProps(props)}
    >
      <div className="h-full pl-4 pr-8 py-4 bg-neutral-100 rounded-sm">
        <Logo className="mb-8" />
        <div className="text-neutral-500">
          {categories.map((standaloneOrCategory) =>
            match(standaloneOrCategory)
              .with(P.instanceOf(Standalone), ({ standalone }) => (
                <div key={standalone.title}>
                  <div className="flex">
                    <div className="flex justify-center items-center w-3 mr-2">
                      <div className="w-1 h-1 rounded-full bg-neutral-300"></div>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`${standalone.slug}/${location.search}`)
                      }
                    >
                      {standalone.title}
                    </button>
                  </div>
                </div>
              ))
              .otherwise(({ category, pages }) => (
                <div key={category}>
                  <Collapsible>
                    <Collapsible.Header>{category}</Collapsible.Header>
                    <Collapsible.Details>
                      {pages.map(({ id, title, slug }) => (
                        <button
                          key={id}
                          onClick={() => navigate(`${slug}/${location.search}`)}
                        >
                          {title}
                        </button>
                      ))}
                    </Collapsible.Details>
                  </Collapsible>
                </div>
              )),
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
