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

export function filterEvents(events, searchText, pastEventsIncluded = false) {
  searchText = replaceUmlauts(searchText.toLowerCase());
  return events.filter(e => {
    let title = e.title
      ? replaceUmlauts(e.title.toLowerCase()).substring(0, searchText.length)
      : '';

    let circles = e.circleValues
      ? e.circleValues.map(c => {
          return c.name
            ? replaceUmlauts(c.name.toLowerCase()).substring(
                0,
                searchText.length
              )
            : '';
        })
      : [];
    let circleSearchFound = false;
    for (let circle of circles) {
      if (levenshteinInRange(searchText, circle)) {
        circleSearchFound = true;
        break;
      }
    }

    let baseSearchFound =
      levenshteinInRange(searchText, title) || circleSearchFound;

    if (pastEventsIncluded) {
      return baseSearchFound;
    } else {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;
      return baseSearchFound && e.date >= today;
    }
  });
}

export function ownCircleEvents(events, userCircle, role) {
  if (role === 5) return events;
  if (role >= 2) {
    return events.filter(e => e.circles.includes(userCircle));
  }
}

export default {
  filterEvents,
  ownCircleEvents
};
