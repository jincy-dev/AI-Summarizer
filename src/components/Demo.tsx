import React from "react";
import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../redux/slices/article";

type Props = {};

const Demo = (props: Props) => {
  const [article, setArticle] = useState({ url: "", summary: "" });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
      console.log(newArticle);
    }
  };
  return (
    <section className="mt-16 w-4 max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
          action=""
        >
          <div className="flex justify-between items-center">
            <img src={linkIcon} alt="link_icon" className="absolute ml-4" />
            <input
              type="url"
              placeholder="Enter a url...."
              value={article.url}
              onChange={(e) => {
                setArticle({ ...article, url: e.target.value });
              }}
              required
              className="url_input peer"
            />
            <button
              type="submit"
              className="submit_btn ml-[-3rem] peer-focus:border-gray-700 peer-focus:text-gray-700 "
            >
              <p>↵</p>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Demo;
