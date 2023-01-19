# RAWRS

## Pages

| Page | Render |
| ---- | ------ |
| Login | CSR |
| Courses | SSR |
| Student Help Form | CSR |
| General Help Form | CSR |
| Course's Student Information | SSR |
| Student Information Dialog | SSR |
| Account | SSR |


## Docker Steps

Create a volume which can be loaded into a container.

[source](https://towardsdatascience.com/connect-to-mysql-running-in-docker-container-from-a-local-machine-6d996c574e55)

```bash
docker volume create rawrs-volume
```

```sql
docker run --name=rawrs-mysql -p3306:3306 -v mysql-volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=rawrs123 -d mysql/mysql-server:latest
```

```
mysql -u root -p
```

Provide password: `rawrs123`

Allow connections outside of docker container local machine itself.

```
update mysql.user set host = '%' where user='root';
```

Setup database.

```
source /app/src/setup.sql
```