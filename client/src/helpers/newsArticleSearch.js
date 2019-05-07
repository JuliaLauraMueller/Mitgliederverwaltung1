import levenshtein from 'js-levenshtein';

const MAX_LEVENSHTEIN_DISTANCE = 1;

function levenshteinInRange(searchText, matchingText) {
  if (levenshtein(searchText, matchingText) <= MAX_LEVENSHTEIN_DISTANCE) {
    return true;
  }
}

function replaceUmlauts(text) {
  return text
    .replace('ä', 'ae')
    .replace('ö', 'oe')
    .replace('ü', 'ue');
}

export function filterNewsArticles(newsArticles, searchText) {
  if (!newsArticles) return [];
  searchText = replaceUmlauts(searchText.toLowerCase());
  return newsArticles.filter(e => {
    let title = e.title
      ? replaceUmlauts(e.title.toLowerCase()).substring(0, searchText.length)
      : '';

    let author = e.author
      ? replaceUmlauts(e.author.toLowerCase()).substring(0, searchText.length)
      : '';

    return (
      levenshteinInRange(searchText, title) ||
      levenshteinInRange(searchText, author)
    );
  });
}

export default {
  filterNewsArticles
};
