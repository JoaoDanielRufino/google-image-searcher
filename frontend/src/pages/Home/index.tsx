import { useState } from 'react';

import Input from '../../components/Input';

import { Container, Form, Header, InputGroup } from './styles';
import { search } from './service';

function Home() {
  const [query, setQuery] = useState('');
  const [fileType, setFileType] = useState('');
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = await search({ q: query });

    console.log(data);
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
            onChange={(e) => setWidth(parseInt(e.target.value))}
          />
          <Input
            labelText="Height (optional)"
            placeholder="1080"
            type="number"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />
        </InputGroup>

        <button type="submit">Search</button>
      </Form>
    </Container>
  );
}

export default Home;
