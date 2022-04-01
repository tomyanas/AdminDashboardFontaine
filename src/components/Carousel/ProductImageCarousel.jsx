import {
  Box,
  IconButton,
  Image,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';
import { CaretLeft, CaretRight } from 'phosphor-react';
import Slider from 'react-slick';

const ArrowLeft = ({ onClick }) => {
  const top = useBreakpointValue({ base: '50%' });
  const side = useBreakpointValue({ base: '0' });
  return (
    <IconButton
      aria-label="left-arrow"
      colorScheme="ghost"
      color="#f1f1f1"
      borderRadius="full"
      position="absolute"
      left={side}
      top={top}
      transform="translate(0%, -50%)"
      zIndex={2}
      onClick={onClick}
      _focus={{
        outline: 'none',
      }}
      _hover={{
        color: '#d1d1d1',
      }}
    >
      <CaretLeft size={32} />
    </IconButton>
  );
};
const ArrowRight = ({ onClick }) => {
  const top = useBreakpointValue({ base: '50%' });
  const side = useBreakpointValue({ base: '0%' });
  return (
    <IconButton
      aria-label="right-arrow"
      colorScheme="ghost"
      color="#f1f1f1"
      borderRadius="full"
      position="absolute"
      right={side}
      top={top}
      transform="translate(0%, -50%)"
      zIndex={2}
      onClick={onClick}
      _focus={{
        outline: 'none',
      }}
      _hover={{
        color: '#d1d1d1',
      }}
    >
      <CaretRight size={32} />
    </IconButton>
  );
};

export const ProductImageCarousel = ({ images }) => {
  const settings = {
    customPaging: function (i) {
      return (
        <Link>
          <Image w="100%" maxwidth="100%" src={images[i]} />
        </Link>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
  };

  return (
    <Box
      m="0 auto"
      pb={{ base: '60px', sm: '75px' }}
      w="100%"
      maxH={{ base: '400px', sm: '500px', md: '500px', lg: '600px' }}
      maxW={{ base: '300px', sm: '400px', md: '400px', lg: '500px' }}
    >
      <Slider {...settings}>
        {images &&
          images.map((image, i) => (
            <Box
              maxH={{ base: '300px', sm: '400px', md: '400px', lg: '500px' }}
              maxW={{ base: '300px', sm: '400px', md: '400px', lg: '500px' }}
              key={image + i}
              // justifyContent="center"
              // alignItems="center"
              // pb="0.5rem"
            >
              <Image
                maxH={{ base: '300px', sm: '400px', md: '400px', lg: '500px' }}
                m="auto"
                maxW={{ base: '300px', sm: '400px', md: '400px', lg: '500px' }}
                objectFit="cover"
                src={image}
              />
            </Box>
          ))}
      </Slider>
    </Box>
  );
};
