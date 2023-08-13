import PropTypes from 'prop-types';
import ButtonAndArrowBtn from '../molecules/buttonAndArrowBtn';

function CTA({ arrowBtnText, newNavURL }) {
  return (
    <section className="mx-auto dark:text-slate-900 max-w-7xl my-16">
      <div className="relative isolate overflow-hidden bg-slate-900 dark:bg-white px-6 pt-16 pb-10 shadow-2xl rounded-3xl">
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stopColor="#0369a1" />
              <stop offset={1} stopColor="#0ea5e9" />
            </radialGradient>
          </defs>
        </svg>
        <div className="mx-auto w-full py-6 text-white dark:text-slate-900 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Start using <span className="text-sky-600">StreamLine</span> today!
          </h2>
          <p className="mt-6 mb-10 text-lg text-center leading-8">
            Use cutting-edge technology to deliver a personalized selection at an affordable price.
          </p>
          <ButtonAndArrowBtn arrowBtnText={arrowBtnText} newNavURL={newNavURL} />
        </div>
      </div>
    </section>
  );
}

CTA.propTypes = {
  arrowBtnText: PropTypes.string.isRequired,
  newNavURL: PropTypes.string.isRequired,
};

export default CTA;

