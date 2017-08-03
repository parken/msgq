import fs from 'fs';
import mv from 'mv';

const fileStructure = {};
function isFolder(filePath) {
  return new Promise(resolve => fileStructure.statAsync(filePath)
      .then((stat) => resolve(stat && stat.isDirectory())));
}

function readdirAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, list) => {
      if (err) return reject();
      return resolve(list);
    });
  });
}

function processQueue(dirList) {
  const fileList = [];
  return new Promise((resolve, reject) => {
    if (dirList.length) {
      const dir = dirList.shift();
      return readdirAsync(dir)
        .then(list => Promise
          .all(list.map(file => isFolder(`${dir}\\${file}`)))
          .then((data) => {
            data.forEach((x, index) => {
              if (x) dirList.push(`${dir}\\${list[index]}`);
              else fileList.push(`${dir}\\${list[index]}`);
            });
            return processQueue(dirList);
          })
          .then(data => {
            fileList.push(...data);
            return resolve(fileList);
          }))
        .catch(err => reject(err));
    }
    return resolve(fileList);
  });
}

Object.assign(fileStructure, {
  writeFile(path, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, (err) => {
        if (err) return reject(err);
        return resolve(path);
      });
    });
  },
  removeFile(path) {
    return Promise.resolve(fs.unlink(path));
  },
  readFile(path, type = 'utf-8') {
    return new Promise((resolve, reject) => {
      fs.readFile(path, type, (err, data) => {
        if (err) reject(path);
        resolve(data);
      });
    });
  },
  getUserHome() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  },
  statAsync(filePath) {
    return new Promise((resolve, reject) =>
      fs.stat(filePath, (err, stat) => {
        if (err) return reject(err);
        return resolve(stat);
      }));
  },
  fileList(filePath) {
    return processQueue([filePath]);
  },
  fileCount(filePath) {
    return this.fileList(filePath).then(data => data.length);
  },
  makeDirectory(dir) {
    const dirSteps = dir.split('\\');
    let tempDir = dirSteps.shift();
    dirSteps.forEach(x => {
      tempDir += `\\${x}`;
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
    });
  },
  moveFolder(from, to, { showError = true } = {}) {
    return new Promise((resolve, reject) =>
      mv(from, to, { mkdirp: true }, err => ((err && showError) ? reject(err) : resolve(to))));
  },
  moveFile(from, to, { showError = true } = {}) {
    return new Promise((resolve, reject) =>
      mv(from, to, err => ((err && showError) ? reject(err) : resolve(to))));
  },
});

export default fileStructure;
