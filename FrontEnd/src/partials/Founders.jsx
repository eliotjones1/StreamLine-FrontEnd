import React from 'react';

import RyanHeadshot from '../images/Ryan_Headshot.jpg';
import JoshKHeadshot from '../images/JoshK_Headshot.jpg';
import EliotHeadshot from '../images/Eliot_Headshot.png';
import JoshFHeadshot from '../images/JoshFHeadshot.jpeg';

function Founders() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Meet the founders</h2>
            <p className="text-xl text-slate-600 dark:text-gray-400">A group of driven Stanford University computer science students who combined their expertise and passion for technology to create a cutting-edge software company. As part of their senior capstone project, these talented individuals set out to revolutionize the way we interact with technology, and StreamLine was created. With their innovative ideas, technical skills, and drive to succeed, these founders are changing the game in the subscription industry.</p>
          </div>

          {/* Testimonials */}
          <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-4 lg:gap-6 items-start lg:max-w-none">

            {/* 1st Founder */}
            <div className="flex flex-col h-full p-6 rounded-lg bg-slate-100 dark:bg-slate-800 shadow-xl">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <img className="rounded-full" src={RyanHeadshot} width="48" height="48" alt="Testimonial 01" />
                    <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-sky-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                    </svg>
                        </div>
                </div>
                <blockquote className="text-lg text-slate-600 dark:text-gray-400 grow">—Technology should make our lives easier, not more complicated. That's why we created StreamLine - to simplify the subscription management process and empower people to affordably enjoy their favorite content.</blockquote>
                <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                  <a href="https://www.linkedin.com/in/ryan-dunn-"className="text-sky-600 text-sky-600 hover:text-sky-900 dark:hover:text-gray-200 transition duration-150 ease-in-out">Ryan Dunn</a> - <cite className="text-slate-600 dark:text-gray-200 not-italic">Comp Sci</cite>
                </div>
              </div>

              {/* 2nd Founder */}
              <div className="flex flex-col h-full p-6 rounded-lg bg-slate-100 dark:bg-slate-800 shadow-xl">
                <div>
                  <div className="relative inline-flex flex-col mb-4">
                    <img className="rounded-full" src={EliotHeadshot} width="48" height="48" alt="Testimonial 02" />
                      <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-sky-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                      </svg>
                        </div>
                  </div>
                  <blockquote className="text-lg text-slate-600 dark:text-gray-400 grow">— We founded StreamLine to create an innovative solution for the challenge of managing multiple subscriptions. Our goal is to help people easily discover and manage their favorite content without the hassle.</blockquote>
                  <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                    <a href="https://www.linkedin.com/in/eliot-krzysztof-jones" className="text-sky-600 text-sky-600 hover:text-sky-900 dark:hover:text-gray-200 transition duration-150 ease-in-out">Eliot Jones</a> - <cite className="text-slate-600 dark:text-gray-200 not-italic">Data Sci</cite>
                  </div>
                </div>

                {/* 3rd Founder */}
              <div className="flex flex-col h-full p-6 rounded-lg bg-slate-100 dark:bg-slate-800 shadow-xl">
                <div>
                  <div className="relative inline-flex flex-col mb-4">
                    <img className="rounded-full" src={JoshKHeadshot} width="48" height="48" alt="Testimonial 02" />
                      <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-sky-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                      </svg>
                        </div>
                  </div>
                  <blockquote className="text-lg text-slate-600 dark:text-gray-400 grow">— Being part of StreamLine has been an exciting journey. We are constantly pushing the boundaries of what's possible in the world of subscription management, and I can't wait to see where we go from here.</blockquote>
                  <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                  <a href="https://www.linkedin.com/in/joshua-karty-6485a822a/" className="text-sky-600 text-sky-600 hover:text-sky-900 dark:hover:text-gray-200 transition duration-150 ease-in-out">Josh Karty</a> - <cite className="text-slate-600 dark:text-gray-200 not-italic">Comp Sci</cite>
                  </div>
                </div>

                {/* 4th Founder */}
                <div className="flex flex-col h-full p-6 rounded-lg bg-slate-100 dark:bg-slate-800 shadow-xl">
                  <div>
                    <div className="relative inline-flex flex-col mb-4">
                      <img className="rounded-full" src={JoshFHeadshot} width="48" height="48" alt="Testimonial 03" />
                        <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-sky-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                        </svg>
                        </div>
                    </div>
                    <blockquote className="text-lg text-slate-600 dark:text-gray-400 grow">— At StreamLine, we're not just building a product - we're building a community. Our mission is to create a platform that empowers users to make informed decisions about their subscriptions and content consumption.</blockquote>
                    <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                      <a href="https://www.linkedin.com/in/josh--francis/" className="text-sky-600 hover:text-sky-900 dark:hover:text-gray-200 transition duration-150 ease-in-out">Josh Francis</a> - <cite className="text-slate-600 dark:text-gray-200 not-italic">Comp Sci</cite>
                    </div>
                  </div>
                </div>


              </div>
            </div>
</section>
  );
}

export default Founders;
