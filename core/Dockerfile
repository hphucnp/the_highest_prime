FROM golang:1.14

WORKDIR /go/src/
COPY . .

RUN go get -d -v ./...
RUN go build

CMD ["./core"]
EXPOSE 8080
