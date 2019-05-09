function replaceUmlauts(text) {
  return text
    .replace('ä', 'ae')
    .replace('ö', 'oe')
    .replace('ü', 'ue');
}

export function filterNewsArticles(newsArticles, searchText) {
  newsArticles = newsArticles.slice(0, 30);
  if (!newsArticles) return [];
  searchText = replaceUmlauts(searchText.toLowerCase());
  return newsArticles.filter(e => {
    let title = e.title ? replaceUmlauts(e.title.toLowerCase()) : '';

    let author = e.author ? replaceUmlauts(e.author.toLowerCase()) : '';

    let article = e.article ? replaceUmlauts(e.article.toLowerCase()) : '';

    return (
      title.toLowerCase().search(searchText.toLowerCase()) !== -1 ||
      author.toLowerCase().search(searchText.toLowerCase()) !== -1 ||
      article.toLowerCase().search(searchText.toLowerCase()) !== -1
    );
  });
}

export default {
  filterNewsArticles
};
