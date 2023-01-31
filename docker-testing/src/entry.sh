#!/bin/bash
# https://www.dotnetthailand.com/storage/sql-server/docker-compose-for-sql-server
# entrypoint.sh
# Exit immediately if a command exits with a non-zero status.
set -e
# if MSSQL_SA_PASSWORD_FILE is set or has value
# https://stackoverflow.com/a/13864829/1872200
# https://stackoverflow.com/a/16753536/1872200

# Your script shell script starts here
#

# mysql -U sa -P password -S localhost,3306 -i setup.sql -o result

# Set your oracle sid 
# ORACLE_SID=$1  # received as parameter
# ORAENV_ASK=NO

# # Connect to your database and execute sql scripts
# # You need to define your oracle username to varialbe UNAME  
# # ﻿and your oracle password to variable UPWD prior to execute this script
# sqlplus << EOF
# "sa"/"password"
# @/app/src/setup.sql
# exit
# EOF

# mysqld -S localhost,3306 -U sa -P "$MSSQL_SA_PASSWORD" -i $INPUT_SQL_FILE > /dev/null 2>&1

# mysql -h 127.0.0.1 -P 3306 -u root -p rawrs_db

# mysql start
# mysql -S localhost:3306 -u sa -p $MSSQL_SA_PASSWORD

# init_db () {
#   INPUT_SQL_FILE="setup.sql"
#   until mysqld -S localhost,3306 -U sa -P "$MSSQL_SA_PASSWORD" -i $INPUT_SQL_FILE > /dev/null 2>&1
#   do
#     # echo -e,  use -e to enable interpretation of backslash-escaped characters
#     echo -e "SQL server is unavailable - sleeping"
#     sleep 1 # Sleep for a second....
#   done
#   echo -e "Done initialize a database"
# }
# # Run init_db and start a SQL Server
# init_db & mysqld start

# # Sets up a volume and docker container for the user
# # https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.3#winget

# Invoke-Expression -Command "docker stop rawrs-mysql"
# Invoke-Expression -Command "docker rm rawrs-mysql"
# Invoke-Expression -Command "docker volume create rawrs-volume"
# Invoke-Expression -Command "docker run --name=rawrs-mysql -p3306:3306 -v mysql-volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=rawrs123 -d mysql/mysql-server:latest"
# # $r = Invoke-Expression -Command 'docker inspect --format="{{.Id}}" rawrs-mysql'
# # $r = Invoke-Expression -Command 'docker inspect -f "{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}" rawrs-mysql'
# # Write-Output -InputObject $r
# # $r2 = Enter-PSSession -ComputerName $r
# # Write-Output -InputObject $r2
# # Enter-PSSession -ContainerId $r
# # Invoke-Command -ScriptBlock { param($p1, $p2)
# #   "p1: $p1"
# #   "p2: $p2"
# # } -ArgumentList Invoke-Command 'docker exec -i "rawrs-mysql"', "mysql -u root -p"
# # $pipe
# Invoke-Expression -Command "docker exec -it rawrs-mysql sh" # -PipelineVariable $pipe
# # Write-Output -InputObject $pipe
# # # Write-Host -Object "mysql -u root -p"
# # Invoke-Expression -InputObject "mysql -u root -p"
# # # $P = Get-Process
# # # # Invoke-Expression -Command "mysql -u root -p"
# # Invoke-Expression -Command "rawrs123"
# # Invoke-Expression -Command "update mysql.user set host = '%' where user='root';"