import { ErrorPageTemplate } from './templates';

export default function Error404() {
  return (
    <ErrorPageTemplate
      errNum={'404'}
      errName={'Page not found'}
      errMessage={"Sorry, we couldn't find the page you're looking for."}
    />
  );
}