# Dockerfile

FROM mysql

# COPY ./src/entry.sh /app/src/entry.sh
COPY ./src/setup.sql /app/src/setup.sql

# RUN chmod +x ./entry.sh
# RUN mkdir -p /var/opt/mssql/data && chown mssql /var/opt/mssql/data

ENV MYSQL_DATABASE = 'rawrs_db'
ENV MYSQL_PASSWORD: 'password'
ENV MYSQL_ROOT_PASSWORD='password'

EXPOSE 3306
