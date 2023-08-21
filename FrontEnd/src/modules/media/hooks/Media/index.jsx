import { useContext } from 'react';
import { MediaContext } from '/src/modules/media/contexts/Media';

export default function useMedia() {
  return useContext(MediaContext);
}
