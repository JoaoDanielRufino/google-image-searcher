package handler

import (
	"encoding/json"

	"github.com/JoaoDanielRufino/google-image-searcher/lambda/api/pkg/search"
	"github.com/aws/aws-lambda-go/events"
)

var headers = map[string]string{
	"Access-Control-Allow-Origin": "http://infrafrontstack-googleimageseacherfrontendbucket3-188c4n2h12l92.s3-website-us-east-1.amazonaws.com",
	"Content-Type":                "application/json",
}

type RequestBody struct {
	ApiKey   string `json:"apiKey"`
	Cx       string `json:"cx"`
	Q        string `json:"q"`
	FileType string `json:"fileType"`
	Start    int64  `json:"start"`
}

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var requestBody RequestBody
	if err := json.Unmarshal([]byte(request.Body), &requestBody); err != nil {
		return handleError(err)
	}

	s := search.NewSearch(requestBody.ApiKey, requestBody.Cx)
	searchResponse, err := s.Search(search.Options{
		Q:        requestBody.Q,
		FileType: requestBody.FileType,
		Start:    requestBody.Start,
	})
	if err != nil {
		return handleError(err)
	}

	return generateResponse(searchResponse)
}

func handleError(err error) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		Headers:    headers,
		Body:       err.Error(),
		StatusCode: 500,
	}, err
}

func generateResponse(searchResponse *search.SearchResponse) (events.APIGatewayProxyResponse, error) {
	response, err := json.Marshal(searchResponse)
	if err != nil {
		return handleError(err)
	}

	return events.APIGatewayProxyResponse{
		Headers:    headers,
		Body:       string(response),
		StatusCode: 200,
	}, nil
}
