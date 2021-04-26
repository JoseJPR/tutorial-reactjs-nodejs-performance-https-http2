import fs from 'fs';

const read = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
});

export default {
  read,
};
