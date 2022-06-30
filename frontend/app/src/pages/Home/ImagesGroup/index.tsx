import { Item } from '../../../interfaces';

import ImageCard from '../../../components/ImageCard';

import { Container, Li } from './styles';

interface Props {
  items: Item[];
}

const ImagesGroup: React.FC<Props> = ({ items }) => {
  return (
    <Container>
      {items.map((item) => (
        <Li key={item.link}>
          <ImageCard {...item} {...item.image} />
        </Li>
      ))}
    </Container>
  );
};

export default ImagesGroup;
