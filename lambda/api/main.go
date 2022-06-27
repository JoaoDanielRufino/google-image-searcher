package main

import (
	"github.com/JoaoDanielRufino/google-image-search/lambda/api/pkg/handler"
	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	lambda.Start(handler.Handler)
}
