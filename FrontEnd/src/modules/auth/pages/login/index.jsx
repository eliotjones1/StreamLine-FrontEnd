import { useNavigate } from 'react-router-dom';
import { useAuth } from '/src/modules/auth/hooks';
import { Header } from '/src/modules/common/components';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const signIn = (event) => {
    event.preventDefault();
    login({
      email: event.target.email.value,
      password: event.target.password.value,
      keepSignedIn: event.target.keepSignedIn.checked,
    });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow">
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-6 md:pb-10">
                <h1 className="h1">Welcome back! We exist to make streaming easier.</h1>
              </div>

              <div className="max-w-sm mx-auto ">
                <form onSubmit={signIn} to="/">
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-slate-800 dark:text-gray-300 text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Password
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="keepSignedIn"
                            className="form-checkbox cursor-pointer"
                          />
                          <span className="text-gray-800 dark:text-gray-400 ml-2">
                            Keep me signed in
                          </span>
                        </label>
                        <button
                          type="button"
                          onClick={() => nav('/reset-password')}
                          className="text-link"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="colored-sky-btn w-full" type="submit">
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 dark:text-gray-400 text-center mt-6">
                  Don&apos;t have an account?{' '}
                  <button type="button" onClick={() => nav('/signup')} className="text-link">
                    {' '}
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
