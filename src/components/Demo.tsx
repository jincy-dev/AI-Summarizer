import React, { useState } from 'react';
import { useLazyGetSummaryQuery } from '../redux/slices/article'; // Adjust the path to where your API slice is located
import { linkIcon } from '../assets'; // Adjust asset import as needed

type Props = {};

const Demo = (props: Props) => {
  const [article, setArticle] = useState({ url: '', summary: '' });

  // Destructure the lazy query hook: trigger function and response (data, error, isLoading)
  const [getSummary, { data, error, isLoading }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger the query with the current article URL
    if (article.url) {
      await getSummary({ articleUrl: article.url }); // Make sure the article URL is passed correctly
    }
  };

  // Update article state once data is available
  React.useEffect(() => {
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);  // Update the article state with the fetched summary
      console.log(newArticle);
    }
  }, [data]); // This effect runs whenever data changes (i.e., when the summary is fetched)

  return (
    <section className="mt-16 w-4 max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center">
            <img src={linkIcon} alt="link_icon" className="absolute ml-4" />
            <input
              type="url"
              placeholder="Enter a URL...."
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

        {/* Loading, error, and data display */}
        {isLoading && <p>Loading summary...</p>}
        {error && <p>Error: {error.message}</p>}
        {data?.summary && (
          <div>
            <h3>Summary</h3>
            <p>{data.summary}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Demo;
