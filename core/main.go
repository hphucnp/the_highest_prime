package main

import (
    "fmt"
    "log"
	"net/http"
	"math"
	"strconv"
	"encoding/json"
)

type ResponseBody struct {
	Message  string
	Data   int
}

func isPrime(i int) bool{
	sqn := math.Sqrt(float64(i))
	isPrime := true
	for j := 2; j <= int(sqn); j++ {
		if i % j == 0 {
			isPrime = false
			break
		}
	}
	return isPrime
}

func getTheBiggestPrime(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["number"]
    
    if !ok || len(keys[0]) < 1 {
        return
    }

    // Query()["key"] will return an array of items, 
    // we only want the single item.
	numberStr := keys[0]
	n, err := strconv.ParseFloat(numberStr, 64);
	if err == nil {	
		var res int;
		for i := int(n)-1; i > 0; i-- {
			if isPrime(i){
				 res = i;
				 break
			}	
		}
		// fmt.Fprintf(w, strconv.Itoa(res));
		// w.Header().Set("Server", "A Go Web Server")
		if res == 0 {
		  w.WriteHeader(204)
		} else {
			w.WriteHeader(200);
			b := ResponseBody{"The biggest prime", res}
			body, err := json.Marshal(b)
			fmt.Println(strconv.Itoa(res))
			fmt.Println(string(body))
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			  }
			w.Header().Set("Content-Type", "application/json")
			w.Write(body)
			// w.Write([]byte("OK"))
		}
	}
    
}

func handleRequests() {
    http.HandleFunc("/", getTheBiggestPrime)
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func main() {
    handleRequests()
}