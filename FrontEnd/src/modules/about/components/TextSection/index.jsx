export default function TextSection({ sectionHeader, pargraphTextList }) {
  return (
    <div className="space-y-4">
      <h2 className="text-4xl mb-6 font-bold tracking-tight">{sectionHeader}</h2>
      {pargraphTextList.map((text, index) => (
        <p className="text-lg leading-8" key={index}>
          {text}
        </p>
      ))}
    </div>
  );
}