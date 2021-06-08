interface File {
  slug: string;
  extension: Format;
}

export function parseFile(file: string): File {
  if (file.split('.').length < 2) {
    throw new Error('File Extension is required');
  }

  const format = file.split('.').pop();

  const slug = file.split('.').slice(0, -1).join('.');

  if (format == 'png' || format == 'jpeg') {
    return { slug, extension: format };
  } else {
    throw new Error("File Extension must be either 'png' or 'jpeg'");
  }
}
