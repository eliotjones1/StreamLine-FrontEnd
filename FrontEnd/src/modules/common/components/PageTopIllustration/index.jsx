export default function Illustration() {
  return (
    <div
      className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-sky-600 to-sky-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            'polygon(75% 45%, 100% 65%, 90% 25%, 85% 0%, 80% 5%, 70% 30%, 55% 60%, 50% 70%, 45% 55%, 40% 35%, 25% 75%, 0% 65%, 20% 100%, 30% 75%, 75% 95%, 75% 45%)',
        }}
      />
    </div>
  );
}
