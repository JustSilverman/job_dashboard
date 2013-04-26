ENV=development
DBNAME=job_dashboard

serve:
	NODE_ENV=$(ENV) node server.js

setupdb:
	createdb $(DBNAME)
	node db_setup.js

dropdb:
	dropdb $(DBNAME)

.PHONY: serve
