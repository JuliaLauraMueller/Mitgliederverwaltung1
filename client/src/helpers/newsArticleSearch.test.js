import { filterNewsArticles } from './newsArticleSearch';

const newsArticle1 = {
  _id: '1',
  title: 'Projektwoche',
  date: '2020-09-10',
  author: 'Loris Muster'
};

const newsArticle2 = {
  _id: '2',
  title: 'Teamevent',
  date: '2019-02-15',
  author: 'Loris Muster'
};

const newsArticle3 = {
  _id: '3',
  title: 'FHNW',
  date: '2019-02-12',
  author: 'Hans Mag'
};

const newsArticle4 = {
  _id: '4',
  title: 'Sommerfest',
  date: '2019-06-12',
  author: 'Andrea Mag'
};

const newsArticle5 = {
  _id: '5',
  title: 'Winterfest',
  date: '2019-10-12',
  author: 'Karl Kunz'
};

const newsArticleFromMockDB = [
  newsArticle1,
  newsArticle2,
  newsArticle3,
  newsArticle4,
  newsArticle5
];

describe('Test if the searchfilter filters the expected events', () => {
  test('filters for expected circles', () => {
    let filteredNewsArticles = filterNewsArticles(
      newsArticleFromMockDB,
      'Projektwoche'
    );
    expect(filteredNewsArticles.length).toEqual(1);
    expect(filteredNewsArticles.includes(newsArticle1)).toBe(true);
  });

  test('filters for multiple articles', () => {
    let filteredNewsArticles = filterNewsArticles(
      newsArticleFromMockDB,
      'Sommerfest'
    );
    expect(filteredNewsArticles.length).toEqual(1);
    expect(filteredNewsArticles.includes(newsArticle4)).toBe(true);
    filteredNewsArticles = filterNewsArticles(
      newsArticleFromMockDB,
      'Winterfest'
    );
    expect(filteredNewsArticles.length).toEqual(1);
    expect(filteredNewsArticles.includes(newsArticle5)).toBe(true);
  });

  test('search for article Teamevent', () => {
    let filteredNewsArticles = filterNewsArticles(
      newsArticleFromMockDB,
      'Teamevent'
    );
    expect(filteredNewsArticles.length).toEqual(1);
    expect(filteredNewsArticles.includes(newsArticle2)).toBe(true);
  });

  test('search for Projektwoche with 1 wrong char', () => {
    let filteredNewsArticles = filterNewsArticles(
      newsArticleFromMockDB,
      'Krojektwoche'
    );
    expect(filteredNewsArticles.length).toEqual(1);
    expect(filteredNewsArticles.includes(newsArticle1)).toBe(true);
  });

  test('search for Projektwoche with 2 wrong chars', () => {
    let filteredNewsArticles = filterNewsArticles(
      newsArticleFromMockDB,
      'Kojektwoche'
    );
    expect(filteredNewsArticles.length).toEqual(0);
  });

  test('search for title Projektwoche with uncompleted searchtext', () => {
    let filteredNewsArticles = filterNewsArticles(newsArticleFromMockDB, 'Pro');
    expect(filteredNewsArticles.length).toEqual(1);
  });

  test('search for title Projektwoche with uncompleted searchtext and 1 wrong char', () => {
    let filteredMembers = filterNewsArticles(newsArticleFromMockDB, 'Krojekt');
    expect(filteredMembers.length).toEqual(1);
  });

  test('search for Projektwoche with uncompleted searchtext', () => {
    let filteredNewsArticles = filterNewsArticles(
      newsArticleFromMockDB,
      'Projekt'
    );
    expect(filteredNewsArticles.length).toEqual(1);
    expect(filteredNewsArticles.includes(newsArticle1)).toBe(true);
  });

  test('search for author Loris Muster with completed searchtext', () => {
    let filteredNewsArticles = filterNewsArticles(
      newsArticleFromMockDB,
      'Loris Muster'
    );
    expect(filteredNewsArticles.length).toEqual(2);
    expect(filteredNewsArticles.includes(newsArticle1)).toBe(true);
    expect(filteredNewsArticles.includes(newsArticle2)).toBe(true);
  });

  test('search for author Loris Muster with uncompleted searchtext', () => {
    let filteredNewsArticles = filterNewsArticles(
      newsArticleFromMockDB,
      'Loris'
    );
    expect(filteredNewsArticles.length).toEqual(2);
    expect(filteredNewsArticles.includes(newsArticle1)).toBe(true);
    expect(filteredNewsArticles.includes(newsArticle2)).toBe(true);
  });

  test('searching with an empty searchtext', () => {
    let filteredNewsArticles = filterNewsArticles(newsArticleFromMockDB, '');
    expect(filteredNewsArticles.length).toEqual(newsArticleFromMockDB.length);
  });

  test('searching for nonexistant entry', () => {
    let filteredNewsArticles = filterNewsArticles(
      newsArticleFromMockDB,
      'jihdshfhgfdhüqsq'
    );
    expect(filteredNewsArticles.length).toEqual(0);
  });
});
