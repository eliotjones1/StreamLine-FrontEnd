import { useContext } from 'react';
import { MediaContext } from '/src/api/modules/media';

export default function useMedia() {
	return useContext(MediaContext);
}
