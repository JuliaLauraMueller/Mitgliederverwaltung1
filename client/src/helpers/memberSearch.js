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

export function filterMembers(members, searchText, searchForCircles = false) {
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

    let company =
      m.company && m.company.companyName
        ? replaceUmlauts(m.company.companyName.toLowerCase()).substring(
            0,
            searchText.length + MAX_LEVENSHTEIN_DISTANCE
          )
        : '';

    let circle =
      m.circle && m.circle.name
        ? replaceUmlauts(m.circle.name.toLowerCase()).substring(
            0,
            searchText.length + MAX_LEVENSHTEIN_DISTANCE
          )
        : '';

    let job = m.job
      ? replaceUmlauts(m.job.toLowerCase()).substring(
          0,
          searchText.length + MAX_LEVENSHTEIN_DISTANCE
        )
      : '';

    let funktion = m.function
      ? replaceUmlauts(m.function.toLowerCase()).substring(
          0,
          searchText.length + MAX_LEVENSHTEIN_DISTANCE
        )
      : '';

    let sector = m.sector
      ? replaceUmlauts(m.sector.toLowerCase()).substring(
          0,
          searchText.length + MAX_LEVENSHTEIN_DISTANCE
        )
      : '';

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

export function filterByCircles(members, filteredCircles) {
  if (!filteredCircles || filteredCircles.length == 0) {
    return members;
  } else {
    return members.filter(m => {
      return filteredCircles.includes(m.circle ? m.circle._id : '');
    });
  }
}

export function ownCircleMembers(members, filteredCircles, role) {
  if (role >= 5 || !filteredCircles || filteredCircles.length == 0) {
    return members;
  } else {
    return members.filter(m => {
      return filteredCircles.includes(m.circle ? m.circle._id : '');
    });
  }
}

export default {
  filterMembers,
  filterByCircles,
  ownCircleMembers
};
