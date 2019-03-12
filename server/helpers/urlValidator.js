module.exports = validateUrl;

function validateUrl(url) {
  if (
    url &&
    url.includes('javascript:') // eslint-disable-line no-script-url
  ) {
    url = '';
  } else if (!url.startsWith('https://')) {
    url = 'https://' + url;
  }
  return url;
}
