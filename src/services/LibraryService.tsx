const baseUrl = 'https://api.discogs.com/';

const get = async (text: string, page: number) => {
    const response = await fetch(`${baseUrl}database/search?artist=${text}&per_page=12&page=${page}&token=YcgrbVVfRZDRyAacrnZcXpkfJmkvjoKoJsQGUYST`);
    const releases = await response.json();
    return releases;
};




const LibraryService = {
  get
};
export default LibraryService;