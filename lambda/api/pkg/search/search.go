package search

import (
	"context"

	"google.golang.org/api/customsearch/v1"
	"google.golang.org/api/option"
)

type Options struct {
	Q        string
	FileType string
	Start    int64
}

type Search struct {
	ApiKey     string
	Cx         string
	searchType string
}

type SearchResponse struct {
	Request  *searchQueries
	NextPage *searchQueries
	Items    []*customsearch.Result
}

type searchQueries struct {
	Count        int64
	SearchTherms string
	SearchType   string
	StartIndex   int64
	Title        string
	TotalResults int64
}

func NewSearch(apiKey, cx string) Search {
	return Search{
		ApiKey:     apiKey,
		Cx:         cx,
		searchType: "image",
	}
}

func (s Search) Search(options Options) (*SearchResponse, error) {
	service, err := s.getCseService()
	if err != nil {
		return nil, err
	}

	cseResponse, err := service.
		List().
		Cx(s.Cx).
		SearchType(s.searchType).
		Q(options.Q).
		FileType(options.FileType).
		Start(options.Start).
		Do()
	if err != nil {
		return nil, err
	}

	return s.searchResponse(cseResponse), nil
}

func (s Search) getCseService() (*customsearch.CseService, error) {
	service, err := customsearch.NewService(
		context.Background(),
		option.WithAPIKey(s.ApiKey),
	)

	return service.Cse, err
}

func (s Search) searchResponse(cseResponse *customsearch.Search) *SearchResponse {
	var request *customsearch.SearchQueriesRequest
	if len(cseResponse.Queries.Request) > 0 {
		request = cseResponse.Queries.Request[0]
	}

	var nextPage *customsearch.SearchQueriesNextPage
	if len(cseResponse.Queries.NextPage) > 0 {
		nextPage = cseResponse.Queries.NextPage[0]
	}

	return &SearchResponse{
		Request: &searchQueries{
			Count:        request.Count,
			SearchTherms: request.SearchTerms,
			SearchType:   request.SearchType,
			StartIndex:   request.StartIndex,
			Title:        request.Title,
			TotalResults: request.TotalResults,
		},
		NextPage: &searchQueries{
			Count:        nextPage.Count,
			SearchTherms: nextPage.SearchTerms,
			SearchType:   nextPage.SearchType,
			StartIndex:   nextPage.StartIndex,
			Title:        nextPage.Title,
			TotalResults: nextPage.TotalResults,
		},
		Items: cseResponse.Items,
	}
}
