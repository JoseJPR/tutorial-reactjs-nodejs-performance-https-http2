import fs from 'fs';

const write = (filePath, data) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, data, (err) => {
    if (err) reject(err);
    resolve('');
  });
});

export default {
  write,
};
