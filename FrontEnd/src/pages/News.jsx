import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from '../partials/Header';
import Footer from '../partials/Footer';
import PageTopIllustration from '../partials/PageTopIllustration';
import PageSelection from '../partials/PageSelection';

function News() {
  const [posts, setPosts] = useState([]);
  const [baseIndex, setBaseIndex] = useState(0);
  const [expandedPosts, setExpandedPosts] = useState([]);
  const numPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/newsletter/getAllPosts/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleChangeBaseIndex = (newBaseIndex) => {
    if (newBaseIndex >= 0 && newBaseIndex < posts.length){
      setBaseIndex(newBaseIndex);
      document.getElementById("scroll-target").scrollIntoView({behavior: "instant"});
    }
  };

  const handleToggleExpand = (postId) => {
    setExpandedPosts((prevExpandedPosts) => {
      if (prevExpandedPosts.includes(postId)) {
        return prevExpandedPosts.filter((id) => id !== postId);
      } else {
        return [...prevExpandedPosts, postId];
      }
    });
  };

  const handleToggleCollapse = (postId) => {
    setExpandedPosts((prevExpandedPosts) => prevExpandedPosts.filter((id) => id !== postId));
  };

  const isPostExpanded = (postId) => expandedPosts.includes(postId);

  const paginatedPosts = posts.slice(baseIndex, baseIndex + numPerPage);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow">
        <PageTopIllustration />
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Content Announcements</h2>
              <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-white">
                Stay updated with the latest announcements from the StreamLine team!
              </p>
            </div>
            <div id="scroll-target" className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <article key={post.id} className="flex flex-col justify-between max-w-xl">
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex items-center gap-x-4 text-xs">
                      <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-slate-600">
                        <span className="absolute inset-0" />
                        {post.title}
                      </h3>
                    </div>
                    <a href={post.href} className="relative z-10 pt-2">
                      <img src={post.image_url} alt="" className="h-60 w-96 rounded-md overflow-hidden" />
                    </a>
                  </div>
                  <div className="group relative">
                    <time dateTime={post.created_at} className="py-1.5">
                      {new Date(post.created_at).toLocaleDateString()}
                    </time>
                    <p
                      className={`mt-5 text-sm leading-6 text-gray-600 dark:text-white ${
                        isPostExpanded(post.id) ? '' : 'line-clamp-3'
                      }`}
                    >
                      {post.content}
                    </p>
                    {!isPostExpanded(post.id) && (
                      <button
                        className="text-blue-600 dark:text-blue-400 mt-2 hover:underline"
                        onClick={() => handleToggleExpand(post.id)}
                      >
                        Read More
                      </button>
                    )}
                    {isPostExpanded(post.id) && (
                      <button
                        className="text-blue-600 dark:text-blue-400 mt-2 hover:underline"
                        onClick={() => handleToggleCollapse(post.id)}
                      >
                        Read Less
                      </button>
                    )}
                  </div>
                  {post.author && (
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <div className="text-sm leading-6">
                        <p className="font-semibold">
                          <a href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </a>
                        </p>
                        <p className="text-gray-600 dark:text-white">{post.author.role}</p>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
            <PageSelection
              baseIndex={baseIndex}
              changeBaseIndex={handleChangeBaseIndex}
              articlesList={posts}
              numPerPage={numPerPage}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default News;
