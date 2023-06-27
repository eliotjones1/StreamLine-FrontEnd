import React, { useState } from "react";

import Header from '../partials/Header';
import Footer from '../partials/Footer';
import PageTopIllustration from '../partials/PageTopIllustration';
import PageSelection from '../partials/PageSelection';

const posts = [
  {
    id: 1,
    title: "What's Coming to Netflix in July 2023",
    href: 'https://www.whats-on-netflix.com/coming-soon/whats-coming-to-netflix-in-july-2023-06-22/',
    description:
      "It's time for an early look ahead at what's set to head to Netflix throughout July 2023. We'll cover all the new movies, series, specials, and games coming up, whether they be Netflix Originals or licensed titles.",
    date: 'Jun 22, 2023',
    datetime: '2023-06-22',
    category: { title: 'Netflix', href: 'https://netflix.com' },
    imageUrl: "https://www.whats-on-netflix.com/wp-content/uploads/2023/06/first-look-whats-coming-to-netflix-july-2023-1280x720.webp",
    author: {
      name: 'Kasey Moore',
      role: "What's on Netflix?",
      href: 'https://twitter.com/kasey__moore',
      imageUrl:
        'https://pbs.twimg.com/profile_images/1349372093759184898/lt9_Gew1_400x400.jpg',
    },
  },
  {
    id: 2,
    title: "What's Coming to Disney+ in July 2023",
    href: 'https://variety.com/feature/whats-on-disney-plus-new-shows-movies-1203517920/',
    description:
      "Disney+ is bringing summer to streaming this July. Kicking off the month is SharkFest, a full slate of programming about the ocean's most popular and feared fish. Five new episodes of the Samuel L. Jackson-led Marvel series \"Secret Invasion\" will premiere throughout the month and select vintage Disney animated shorts are set to be added on July 7.",
    date: 'Jun 21, 2023',
    datetime: '2023-06-21',
    category: { title: 'Disney+', href: 'https://www.disneyplus.com/' },
    imageUrl: "https://variety.com/wp-content/uploads/2022/07/My-project-1-12.jpg?w=1000&h=563&crop=1",
    author: {
      name: "Sophia Scorziello",
      role: "Variety",
      href: 'https://variety.com/author/sscorziello/',
      imageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
  },
  {
    id: 3,
    title: "Summer 2023 TV Preview: 20 Best Shows...",
    href: '#',
    description:
      "Scared you're not going to find anything to watch on TV this summer? Still lamenting the end of Succession? Did you find yourself triggered by the uncertainty left by the Ted Lasso Season 3 finale? The good news is that Summer 2023 is going to be chock full of amazing new and returning TV shows for you to watch in the comfort of your air conditioned home. The even better news? The Summer TV season has already begun!",
    date: 'June 5, 2023',
    datetime: '2023-06-05',
    category: undefined,
    imageUrl: "https://decider.com/wp-content/uploads/2023/06/never-have-i-ever-s4.jpg?quality=75&strip=all&w=1284",
    author: {
      name: "Meghan O'Keefe",
      role: "Decider",
      href: 'https://twitter.com/megsokay',
      imageUrl:
        'https://decider.com/wp-content/uploads/2014/07/meghan-okeefe-bio.png?w=120&h=120&crop=1',
    },
  },
  {
    id: 4,
    title: "New On Hulu June 2023, Plus What's...",
    href: 'https://decider.com/article/new-on-hulu/',
    description:
      "The list of new titles streaming on Hulu in June is full of terrific titles that are sure to have you basking in hot content all month long. Get ready for the excellent movies and shows coming out, including the releases of Hulu Original movies and series like Flamin' Hot, The Bear: Complete Season 2, and more, all coming your way within the next few weeks. Other noteworthy titles to look out for this month include Hulu Original titles like The Age of Influence: Complete Season 1, Dragons: The Nine Realms: Complete Season 6, and Jagged Mind.",
    date: 'June 1, 2023',
    datetime: '2023-06-01',
    category: { title: 'Hulu', href: 'https://www.hulu.com/' },
    imageUrl: "https://i.ytimg.com/vi_webp/o0yuVHT82Bg/maxresdefault.webp",
    author: {
      name: 'Maddy Casale',
      role: 'Decider',
      href: 'https://twitter.com/madhoops',
      imageUrl:
        'https://decider.com/wp-content/uploads/2019/10/maddy_casale.jpg?quality=90&strip=all&w=120&h=120&crop=1',
    },
  },
  {
    id: 5,
    title: "New On Amazon Prime Video June 2023...",
    href: 'https://decider.com/article/new-on-amazon-prime/',
    description:
      "Prime Video releases big-time new movies and shows like My Fault and Tom Clancy's Jack Ryan: Season 4 for free streaming this June. The platform's streaming selection is treating you with the best titles hitting Prime Video, including other Prime Video Originals like With Love: Season 2, The Lake: Season 2, and Medellin, so make sure you check them out.",
    date: 'June 1, 2023',
    datetime: '2023-06-01',
    category: { title: 'Prime Video', href: 'https://www.amazon.com/Amazon-Video/b?ie=UTF8&node=2858778011' },
    imageUrl: "https://i.ytimg.com/vi_webp/PaB7cGBuCP0/maxresdefault.webp",
    author: {
      name: 'Maddy Casale',
      role: 'Decider',
      href: 'https://twitter.com/madhoops',
      imageUrl:
        'https://decider.com/wp-content/uploads/2019/10/maddy_casale.jpg?quality=90&strip=all&w=120&h=120&crop=1',
    },
  },
  {
    id: 6,
    title: "New On Max June 2023, Plus What's...",
    href: 'https://decider.com/article/new-on-max/',
    description:
      "New Max movies and shows drop on a regular basis, and the June 2023 Max schedule is serving up top titles all month long, with brand new premieres of original releases like series The Righteous Gemstones: Season 3 and drama film Reality. Max launches this month with a plethora of exclusive, high quality content you're sure to love, including plenty of new premieres of Max Original titles like Bama Rush, SmartLess: On the Road, and What Am I Eating? With Zooey Deschanel, along with countless other classic titles you know and love.",
    date: 'June 1, 2023',
    datetime: '2023-06-01',
    category: { title: 'HBO Max', href: 'https://www.max.com/' },
    imageUrl: 'https://i.ytimg.com/vi_webp/HP9fNXXmbb0/maxresdefault.webp',
    author: {
      name: 'Maddy Casale',
      role: 'Decider',
      href: 'https://twitter.com/madhoops',
      imageUrl:
        'https://decider.com/wp-content/uploads/2019/10/maddy_casale.jpg?quality=90&strip=all&w=120&h=120&crop=1',
    },
  },
  // More posts...
]

function News() {
  const [curIndex, setCurIndex] = useState(0);

  const handleIndexChange = (newIndex) => {
    console.log(posts.length)
    console.log(newIndex);
    if (newIndex < 0){
      setCurIndex(0);
    } else if (newIndex >= posts.length){
      setCurIndex(curIndex);
    } else {
      setCurIndex(newIndex);
    }
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <main className="grow">
        <PageTopIllustration/>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Content Annoucements</h2>
              <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-white">
                Stay updated with the latest content from all streaming services in one place.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {posts.map((post, index) => {
                  if (index >= curIndex && index < curIndex + 6){
                    return (
                      <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                        <div className="flex items-center gap-x-4 text-xs">
                          <time dateTime={post.datetime} className="py-1.5">
                            {post.date}
                          </time>
                          {
                            post.category !== undefined &&
                            <a
                            href={post.category.href}
                            className="relative z-10 rounded-full bg-gray-50 dark:bg-slate-700 px-3 py-1.5 font-medium text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600"
                          >
                            {post.category.title}
                          </a>
                          }
                        </div>
                        <a
                          href={post.href}
                          className="relative z-10 pt-2"
                        >
                          <img src={post.imageUrl} alt="" className="h-60 w-96 rounded-md overflow-hidden"/>
                        </a>
                        <div className="group relative">
                          <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-slate-600">
                            <a href={post.href}>
                              <span className="absolute inset-0" />
                              {post.title}
                            </a>
                          </h3>
                          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-white">{post.description}</p>
                        </div>
                        <div className="relative mt-8 flex items-center gap-x-4">
                          <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full" />
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
                      </article>
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
        <PageSelection baseIndex={curIndex} changeBaseIndex={handleIndexChange} articlesList={posts} numPerPage={6}/>
      </main>
      <Footer />
    </div>

    
  )
}

export default News;