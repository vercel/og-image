export const parseImages = (
  images: string[],
  widths: string[],
  heights: string[]
): Image[] =>
  images.map((image, index) => {
    if (!widths[index]) {
      throw new Error(
        'Not enough image widths were specified. There are more images than image widths.'
      );
    }

    if (!heights[index]) {
      throw new Error(
        'Not enough image heights were specified. There are more images than image heights.'
      );
    }

    return {
      src: image,
      width: widths[index],
      height: heights[index],
    };
  });
