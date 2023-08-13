import ErrorPage from '../components/templates/errorPage';

export default function NotAuth() {
  return (
    <ErrorPage
      errNum={'401'}
      errName={'Unauthorized'}
      errMessage={"Oops! You don't have access to this page."}
    />
  );
}
