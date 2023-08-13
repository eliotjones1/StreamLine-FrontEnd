import ImageContainer from '../molecules/imageContainer';

const images = [
  {
    src: 'https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UY2500_.jpg',
    alt: '',
  },
  {
    src: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1080_.jpg',
    alt: '',
  },
  {
    src: 'https://m.media-amazon.com/images/M/MV5BMTdmZjBjZjQtY2JiNS00Y2ZlLTg2NzgtMjUzMGY2OTVmOWJiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX675_.jpg',
    alt: '',
  },
  {
    src: 'https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
    alt: '',
  },
  {
    src: 'https://m.media-amazon.com/images/M/MV5BNTg3NjcxYzgtYjljNC00Y2I2LWE3YmMtOTliZTkwYTE1MmZiXkEyXkFqcGdeQXVyNTY4NDc5MDE@._V1_FMjpg_UX1080_.jpg',
    alt: '',
  },
  {
    src: 'https://m.media-amazon.com/images/M/MV5BODA2Mjk0N2MtNGY0Mi00ZWFjLTkxODEtZDFjNDg4ZDliMGVmXkEyXkFqcGdeQXVyMzAzNTY3MDM@._V1_FMjpg_UY4000_.jpg',
    alt: '',
  },
  {
    src: 'https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_FMjpg_UY2048_.jpg',
    alt: '',
  },
];

export default function Image7Grid() {
  return (
    <div aria-hidden="true" className="pointer-events-none col-span-1 col-start-2 overflow-hidden">
      <div className="transform">
        <div className="grid grid-cols-3 gap-x-6 lg:gap-x-8">
          <div className="grid justify-items-center flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
            {images.slice(0, 2).map((image, index) => (
              <ImageContainer
                key={index}
                src={image.src}
                alt={image.alt}
                classNameMods={index === 0 ? 'items-end' : 'items-start'}
              />
            ))}
          </div>

          <div className="grid justify-items-center flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
            {images.slice(2, 5).map((image, index) => (
              <ImageContainer key={index} src={image.src} alt={image.alt} />
            ))}
          </div>

          <div className="grid justify-items-center flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
            {images.slice(5, 7).map((image, index) => (
              <ImageContainer
                key={index}
                src={image.src}
                alt={image.alt}
                classNameMods={index === 0 ? 'items-end' : 'items-start'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
