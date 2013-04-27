module.exports = db = {}
var pg = require('pg');
var conString = "postgres://@localhost/job_dashboard";
var client = new pg.Client(conString);

var newJob = "INSERT INTO jobs(company_name, headline, url, created_on, updated_on) values($1, $2, $3, $4, $5)";
db.saveJob = function(data, cb) {
  client.connect(function(err) {
    client.query(newJob, valuesWithDates(data), function(err, result){
      if(err) return cb(err);
      cb(noErr, data);
    });
  });
}

function valuesWithDates(obj) {
  var now = new Date()
  return pluckValues(obj).concat([now, now])
}

function pluckValues(obj) {
  var values = [];
  for (var key in obj) values.push(obj[key]);
  return values;
}

noErr = null
