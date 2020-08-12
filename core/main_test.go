package main

import (
	"testing"
)

//TestIsPrime is to test isPrime function
func TestIsPrime(t *testing.T) {
	got := isPrime(5);
    if got != true {
        t.Errorf("isPrime(5) is %v, want true", got)
    }
}

func TestTheBiggest(t *testing.T) {
	got := theBiggerPrime(50);
    if got != 47 {
        t.Errorf("isPrime(5) is %d, want 47", got)
    }
}

//Todo test api