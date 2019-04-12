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
//TODO: handle circles array
export function filterEvents(events, searchText, pastEventsIncluded = false) {
  if (!searchText || searchText.length === 0) {
    return events;
  }

  searchText = replaceUmlauts(searchText.toLowerCase());

  return events.filter(e => {
    let title = e.title
      ? replaceUmlauts(e.title.toLowerCase()).substring(
          0,
          searchText.length + MAX_LEVENSHTEIN_DISTANCE
        )
      : '';

    let circle =
      e.circle && e.circle.name
        ? replaceUmlauts(e.circleValues.name.toLowerCase()).substring(
            0,
            searchText.length + MAX_LEVENSHTEIN_DISTANCE
          )
        : '';

    let baseSearchFound =
      levenshteinInRange(searchText, title) ||
      levenshteinInRange(searchText, circle);

    if (pastEventsIncluded) {
      return baseSearchFound;
    } else {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = yyyy + mm + dd;
      //TODO: formation date?
      //console.log(e.date); console.log(today); console.log(e.date >= today);
      return baseSearchFound && e.date >= today;
    }
  });
}

export function ownCircleEvents(events, filteredCircles, role) {
  if (role >= 2 || !filteredCircles || filteredCircles.length === 0) {
    return events;
  } else {
    return events.filter(e => {
      return filteredCircles.includes(e.circle ? e.circle._id : '');
    });
  }
}

export default {
  filterEvents,
  ownCircleEvents
};
