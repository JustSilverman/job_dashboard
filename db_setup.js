var pg = require('pg');
var conString = "postgres://@localhost/job_dashboard";
var client = new pg.Client(conString);

//Create tables
  var createCompanies = "CREATE TABLE companies\
                        ( id SERIAL PRIMARY KEY,\
                          name varchar(100) NOT NULL,\
                          industry varchar(200),\
                          location varchar(100),\
                          pic text,\
                          url text,\
                          angellist_id integer,\
                          crunchbase_id integer\
                        );"

  var createJobs      = "CREATE TABLE jobs \
                        ( id SERIAL PRIMARY KEY,\
                          company_name varchar(100) NOT NULL,\
                          headline text,\
                          url text\
                        );"

client.connect(function(err){
  var sqlStr = [createCompanies, createJobs].join(" ");
  client.query(sqlStr, function(err, result){
    if(err) return console.log(err);
    console.log("Database setup complete.")
    client.end();
  });
});
