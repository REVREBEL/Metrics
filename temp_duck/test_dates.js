function toLocalStr(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-');
}
const localMidnight = new Date(2025, 7, 1); // Aug 1 local
console.log("Local midnight:", localMidnight);
console.log("Local str toLocalStr:", toLocalStr(localMidnight));
console.log("Local str ISO:", localMidnight.toISOString().split('T')[0]);

const utcMidnight = new Date("2025-08-01T00:00:00.000Z");
console.log("UTC midnight:", utcMidnight);
console.log("UTC str toLocalStr (local midnight was prior day in US):", toLocalStr(utcMidnight));
console.log("UTC str ISO:", utcMidnight.toISOString().split('T')[0]);
