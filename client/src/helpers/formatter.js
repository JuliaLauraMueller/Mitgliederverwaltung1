export default function formatDate(ufDate) {
  return (
    ufDate.getUTCFullYear() +
    '-' +
    ('0' + (ufDate.getUTCMonth() + 1)).slice(-2) +
    '-' +
    ('0' + ufDate.getUTCDate()).slice(-2)
  );
}
