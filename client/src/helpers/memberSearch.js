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

export default function filterMembers(members, searchText, searchForCircles) {
  if (!searchText || searchText.length == 0) {
    return members;
  }
  searchText = replaceUmlauts(searchText.toLowerCase());

  return members.filter(m => {
    let surname = replaceUmlauts(m.surname.toLowerCase()).substring(
      0,
      searchText.length + MAX_LEVENSHTEIN_DISTANCE
    );

    let fullname = replaceUmlauts(
      m.firstname.concat(' ', m.surname).toLowerCase()
    ).substring(0, searchText.length);

    let company = m.company
      ? replaceUmlauts(m.company.companyName.toLowerCase()).substring(
          0,
          searchText.length + MAX_LEVENSHTEIN_DISTANCE
        )
      : '';

    let circle = m.circle
      ? replaceUmlauts(m.circle.name.toLowerCase()).substring(
          0,
          searchText.length + MAX_LEVENSHTEIN_DISTANCE
        )
      : '';

    let job = replaceUmlauts(m.job.toLowerCase()).substring(
      0,
      searchText.length + MAX_LEVENSHTEIN_DISTANCE
    );

    let funktion = replaceUmlauts(m.function.toLowerCase()).substring(
      0,
      searchText.length + MAX_LEVENSHTEIN_DISTANCE
    );

    let sector = replaceUmlauts(m.sector.toLowerCase()).substring(
      0,
      searchText.length + MAX_LEVENSHTEIN_DISTANCE
    );

    let baseSearchFound =
      levenshteinInRange(searchText, surname) ||
      levenshteinInRange(searchText, fullname) ||
      levenshteinInRange(searchText, company) ||
      levenshteinInRange(searchText, job) ||
      levenshteinInRange(searchText, funktion) ||
      levenshteinInRange(searchText, sector);

    if (searchForCircles) {
      return baseSearchFound || levenshteinInRange(searchText, circle);
    } else {
      return baseSearchFound;
    }
  });
}
