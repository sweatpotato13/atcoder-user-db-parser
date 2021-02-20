FROM postgres:13.1

COPY conf/postgresql.conf /tmp/postgresql.conf
COPY updateConfig.sh      /docker-entrypoint-initdb.d/_updateConfig.sh
