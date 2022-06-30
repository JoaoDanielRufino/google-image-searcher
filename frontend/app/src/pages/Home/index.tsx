import { useState } from 'react';

import Search, { SearchRequest, SearchResponse } from './service';

import ImagesGroup from './ImagesGroup';

import Input from '../../components/Input';
import Pagination from '../../components/Pagination';

import {
  Container,
  Form,
  Header,
  InputGroup,
  PaginationContainer,
} from './styles';

function Home() {
  const [query, setQuery] = useState('');
  const [fileType, setFileType] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [startIndex, setStartIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchResponse, setSearchResponse] = useState<SearchResponse>();

  async function fetchData() {
    setLoading(true);

    if (!query) {
      alert('Query input is required');
      setLoading(false);
      return;
    }

    const request: SearchRequest = {
      q: query,
      start: startIndex,
      ...(fileType && { fileType }),
      ...(width && { width: parseInt(width) }),
      ...(height && { height: parseInt(height) }),
    };

    const data = await Search(request);

    setSearchResponse(data);
    setStartIndex(data.nextPage.startIndex);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetchData();
  }

  function handlePreviousClick() {}

  async function handleNextClick() {
    await fetchData();
  }

  return (
    <Container>
      <Header>
        <h1>Google Image Searcher</h1>
      </Header>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            labelText="Query"
            placeholder="wallpaper 4k"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Input
            labelText="File type (optional)"
            placeholder="png"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
          />
          <Input
            labelText="Width (optional)"
            placeholder="1920"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <Input
            labelText="Height (optional)"
            placeholder="1080"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </InputGroup>

        <button type="submit" disabled={loading}>
          Search
        </button>
      </Form>

      {searchResponse && <ImagesGroup items={searchResponse.items} />}

      {searchResponse && (
        <PaginationContainer>
          <Pagination
            hasPrevious={startIndex > 11}
            disableButtons={loading}
            onPreviousClick={handlePreviousClick}
            onNextClick={handleNextClick}
          />
        </PaginationContainer>
      )}
    </Container>
  );
}

export default Home;
