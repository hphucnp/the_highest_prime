package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"strconv"

	"github.com/rs/cors"
)

// ResponseBody is for http response body
// Message is something you want client to notice
// Data is what client needs
type ResponseBody struct {
	Message string
	Data    int
}

// Check if a number is prime or not
func isPrime(i int) bool {
	sqn := math.Sqrt(float64(i))
	isPrime := true
	for j := 2; j <= int(sqn); j++ {
		if i%j == 0 {
			isPrime = false
			break
		}
	}
	return isPrime
}

func theBiggerPrime(n float64) int {
	var res int
	// from the less than 1 down to the bottom,
	// which is prime is the biggest prime ever
	for i := int(n) - 1; i > 0; i-- {
		if isPrime(i) {
			res = i
			break
		}
	}
	return res
}

func getTheBiggestPrime(w http.ResponseWriter, r *http.Request) {

	keys, ok := r.URL.Query()["number"]

	if !ok || len(keys[0]) < 1 {
		return
	}

	// Query()["key"] will return an array of items,
	// we only want the single item.
	numberStr := keys[0]
	n, err := strconv.ParseFloat(numberStr, 64)
	if err == nil {
		res := theBiggerPrime(n)
		// No data, respond with 204 status
		if res == 0 {
			w.WriteHeader(204)
		} else {
			w.WriteHeader(200)
			b := ResponseBody{"The biggest prime", res}
			body, err := json.Marshal(b)
			fmt.Println(string(body))
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			w.Write(body)
		}
	}

}

//Handle REST requests with cors enabled
func handleRequests() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", getTheBiggestPrime)
	handler := cors.Default().Handler(mux)
	log.Fatal(http.ListenAndServe(":8080", handler))
}

func main() {
	handleRequests()
}
