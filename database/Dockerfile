#Dockerfile

FROM mcr.microsoft.com/mssql/server
WORKDIR /src

COPY src .

# https://dbafromthecold.com/2019/11/18/using-volumes-in-sql-server-2019-non-root-containers/
USER root

# RUN chmod +x ./entry.sh
RUN mkdir -p /var/opt/mssql/data && chown mssql /var/opt/mssql/data

USER mssql

ENTRYPOINT [ "./entry.sh" ]
EXPOSE 1433

# RUN --name=rawrs-mysql -p3306:3306 -v mysql-volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=rawrs123