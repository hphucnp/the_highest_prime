### PRIME APP

## Backend
1. Run locally: 
    - `go run ./core/main.go`
    - test API: `curl --location --request GET 'localhost:8080?number=100'`
2. Run test:  `go test -v ./...`

## Frontend
1. Run locally:
   - `yarn`
   - `yarn start`
   - go to localhost:3000 

## DevOps
1. Build: 
    - Build At Once Using Docker Compose: `docker-compose build`
    - Build Each Service Using Docker: 
        + Frontend: `cd frontend; docker build -t phucnguyendekttek/prime-front:1.0.0 .`
        + Backend: `cd core; docker build -t phucnguyendekttek/prime:1.0.0 .`
2. Deploy:
    - > Using Kubernetes Cluster on GCP (Google Cloud Platform) or any other cloud services 
      > using docker images in my dockerhub account
    - Run all in once using docker-compose: `docker-compose up -d` (not working because of some hardcode into cloud urls)
    - Run each service:
        + Frontend: `docker run -it -p 80:80 --rm --name prime-front phucnguyendekttek/prime-front:1.0.0`
        + Backend: `docker run -it -p 8080:8080 --rm --name prime phucnguyendekttek/prime:1.0.0`