 
docker build -t brain-agriculture-db-image .

docker run --name brain-agriculture-db-instance -p 5432:5432 -d brain-agriculture-db-image
