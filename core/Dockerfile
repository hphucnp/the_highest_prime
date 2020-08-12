FROM golang:1.14

WORKDIR /go/src/prime
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

CMD ["prime"]
EXPOSE 8080