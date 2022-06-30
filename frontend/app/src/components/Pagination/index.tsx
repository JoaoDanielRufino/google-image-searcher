import { Container } from './styles';

interface Props {
  hasPrevious?: boolean;
  hasNext?: boolean;
  disableButtons?: boolean;
  onPreviousClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onNextClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Pagination: React.FC<Props> = ({
  hasPrevious = true,
  hasNext = true,
  disableButtons = false,
  onPreviousClick,
  onNextClick,
}) => {
  return (
    <Container>
      <button
        disabled={disableButtons || !hasPrevious}
        onClick={onPreviousClick}
      >
        Previous
      </button>
      <button disabled={disableButtons || !hasNext} onClick={onNextClick}>
        Next
      </button>
    </Container>
  );
};

export default Pagination;
