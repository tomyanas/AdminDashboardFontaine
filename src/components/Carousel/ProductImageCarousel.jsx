import {
  background,
  Box,
  IconButton,
  Image,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CaretLeft, CaretRight } from "phosphor-react";
import Slider from "react-slick";
const baseUrl = "https://picsum.photos";
// Settings for the slider
// const settings = {
//   dots: true,
//   arrows: false,
//   fade: true,
//   infinite: true,
//   autoplay: true,
//   speed: 500,
//   autoplaySpeed: 5000,
//   slidesToShow: 1,
//   slidesToScroll: 1,
// };

const ArrowLeft = ({ className, style, onClick }) => {
  console.log(style, className);
  const top = useBreakpointValue({ base: "50%" });
  const side = useBreakpointValue({ base: "0" });
  return (
    <IconButton
      aria-label="left-arrow"
      colorScheme="ghost"
      borderRadius="full"
      position="absolute"
      left={side}
      top={top}
      transform="translate(0%, -50%)"
      zIndex={2}
      onClick={onClick}
      _focus={{
        outline: "none",
      }}
      _hover={{
        color: "#d1d1d1",
      }}
    >
      <CaretLeft size={32} />
    </IconButton>
  );
};
const ArrowRight = ({ className, style, onClick }) => {
  const top = useBreakpointValue({ base: "50%" });
  const side = useBreakpointValue({ base: "0%" });
  return (
    <IconButton
      aria-label="right-arrow"
      colorScheme="ghost"
      borderRadius="full"
      position="absolute"
      right={side}
      top={top}
      transform="translate(0%, -50%)"
      zIndex={2}
      onClick={onClick}
      _focus={{
        outline: "none",
      }}
      _hover={{
        color: "#d1d1d1",
      }}
    >
      <CaretRight size={32} />
    </IconButton>
  );
};

export const ProductImageCarousel = ({ images }) => {
  // const [slider, setSlider] = useState();

  const settings = {
    customPaging: function (i) {
      return (
        <Link>
          <Image
            w="100%"
            maxwidth="100%"
            src={`${baseUrl}/id/10${i + 1}/400/300`}
          />
        </Link>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
  };

  return (
    <Box m="0 auto" pb={{base:"60px", sm:"75px" }} w="100%" maxW="600px" >
      <Slider {...settings}>
        <Box>
          <Image w="100%" src={baseUrl + `/id/101/400/300`} />
        </Box>
        <Box>
          <Image w="100%" src={baseUrl + `/id/102/400/300`} />
        </Box>
        <Box>
          <Image w="100%" src={baseUrl + `/id/102/400/300`} />
        </Box>
        <Box>
          <Image w="100%" src={baseUrl + `/id/103/400/300`} />
        </Box>
    
      </Slider>
    </Box>
  );
};

