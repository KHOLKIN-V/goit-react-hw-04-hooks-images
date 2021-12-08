export const mapper = (imgs) => {
	return imgs.map(({ id, webformatURL, largeImageURL }) => ({
		id, webformatURL, largeImageURL
	}));
};