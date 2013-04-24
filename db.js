module.exports = db = {}

db.saveData = function(data, cb) {
  console.log("saved: "  + JSON.stringify(data));
  cb(noErr, data);
}

noErr = null
