import { useState } from 'react';

import {
  Container,
  DescriptionContainer,
  ErrorImageContainer,
  FileFormat,
  Image,
  Title,
} from './styles';

interface Props {
  title: string;
  htmlTitle: string;
  link: string;
  fileFormat: string;
  width: number;
  height: number;
  contextLink: string;
}

const ImageCard: React.FC<Props> = (props) => {
  const [imageError, setImageError] = useState(false);

  function handleError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    setImageError(true);
  }

  return (
    <Container>
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        {!imageError && (
          <Image src={props.link} alt={props.title} onError={handleError} />
        )}
        {imageError && (
          <ErrorImageContainer>
            <span>
              Failed to load image, but you can click here to go to image url
            </span>
          </ErrorImageContainer>
        )}
      </a>
      <DescriptionContainer>
        <Title dangerouslySetInnerHTML={{ __html: props.htmlTitle }} />
        <span>
          {props.width}x{props.height}
        </span>
        <FileFormat>{props.fileFormat}</FileFormat>
        <a href={props.contextLink} target="_blank" rel="noopener noreferrer">
          {props.contextLink}
        </a>
      </DescriptionContainer>
    </Container>
  );
};

export default ImageCard;
