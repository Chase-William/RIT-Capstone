# RAWRS

## Dependency Setup

Our project requires the installation of:

- Install [Node](https://nodejs.org/en/) (I am using 17.6.0, however the latest LTS should work too according to [here](https://nextjs.org/docs/upgrading))

  Your node installation includes the following important tools:
  - npx, used to execute packages that haven't been installed *(commonly used in generating templates)*
  - npm, a package manager that doubles to run scripts you define in your `package.json` file

- Install [MySQL](https://www.mysql.com/downloads/) (I am using version 8.26.0, anything close should work too)
  - Configure your server to run on port 3306 *(default)* and use the default `username: root` and `password: password` (This could all be omitted with MySQL being containerized in docker if it was setup)

- Install [git](https://git-scm.com/downloads) if you don't have it already. If you have Github Desktop then you should already have it. You can test this by opening a terminal and running `git --version`.

## Project Setup

In a terminal in the prefered directory for your project, run `git clone https://github.com/Chase-William/RIT-CapSTONERS`. This will create a folder and inside will be a copy of the project. Change directory into the project's root directory and then run `npm install` *(this may require a terminal with elevated privilage)*. This will download all the packages require for the project to function.

That is:
- `git clone https://github.com/Chase-William/RIT-CapSTONERS`
- `cd RIT-CapSTONERS`
- `npm install`

Once that is installed, we need to setup Prisma. In the project root dir, run the following:

- `npx prisma db push`, pushes the schema to the MySQL instance running
- `npx prisma generate`, generates the client-side library to match the schema in your node project
- `npx prisma db seed`, populates the database with default records

#### What Generation Does

After modifying the Prisma schema, run `npx prisma generate` to keep the generated Prisma library in sync. [read here](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/install-prisma-client-typescript-postgres)

> Ensure you drop the database entirely before seeding the database if already seeded.

#### Seeding The Database

Seeding a database will insert default data into the database. Our default data is housed within `prisma/seed.ts` and can be used by running `npx prisma db seed`. If you run this and get a *Unique constraint failed on the constraint*, the database already contains seeded records.



## Docker Steps *(what I had started.. kinda deprecated)*

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