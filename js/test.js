let counts = [
  ['John', 10],
  ['Kristine', 15],
  ['Jon', 5],
  ['Christina', 20],
  ['Johnny', 8],
  ['Eve', 5],
  ['Chris', 12],
];
let synonyms = [
  ['John', 'Jon'],
  ['Johnny', 'John'],
  ['Kristine', 'Christina'],
];
const dup = {};
synonyms.map((name) => {
  dup[name[1]] = name[0];
});

const nameCounts = {};
counts.map((name) => {
  nameCounts[name[0]] = name[1];
});
const final = {};

Object.keys(nameCounts).map((name) => {
  if (name in dup) {
    if (dup[name] in dup) {
      const dName = dup[dup[name]];
      final[dName] = final[dName]
        ? final[dName] + nameCounts[name]
        : nameCounts[name];
    } else
      final[dup[name]] = final[dup[name]]
        ? final[dup[name]] + nameCounts[name]
        : nameCounts[name];
  } else
    final[name] = final[name]
      ? final[name] + nameCounts[name]
      : nameCounts[name];
});
console.log(final);
