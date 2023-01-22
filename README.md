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


### Prisma Usage

To push the Prisma schema located in `./prisma/schema.prisma` to the database:

1. ensure the database is running
2. `./.env` is updated
3. Run `npx prisma db push`

This will create the `rawrs` database with all tables required.

To inspect the results of this open a *mySQL commandline client and login, then enter `USE rawrs;` followed by `SHOW TABLES;`. This will show you a list of all the tables created from the push.

After modifying the Prisma schema, run `npx prisma generate` to keep the generated Prisma library in sync. [read here](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/install-prisma-client-typescript-postgres)

#### Seed The Database

Seeding a database will insert default data into the database. Our default data is housed within `prisma/seed.ts` and can be used by running `npx prisma db seed`. If you run this and get a *Unique constraint failed on the constraint*, the database already contains seeded records.













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