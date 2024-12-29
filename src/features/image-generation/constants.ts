export const defaultModels: ImageGenerationModel[] = [
  { slug: "black-forest-labs/flux-dev", name: "Flux Dev" },
  { slug: "black-forest-labs/flux-schnell", name: "Flux Schnell" },
];

export const aspectRatios: AspectRatio[] = [
  { value: "1:1", label: "Square (1:1)" },
  { value: "16:9", label: "Widescreen (16:9)" },
  { value: "21:9", label: "Ultrawide (21:9)" },
  { value: "3:2", label: "Classic (3:2)" },
  { value: "2:3", label: "Portrait (2:3)" },
  { value: "4:5", label: "Instagram Portrait (4:5)" },
  { value: "5:4", label: "Large Format (5:4)" },
  { value: "3:4", label: "Portrait (3:4)" },
  { value: "4:3", label: "Standard (4:3)" },
  { value: "9:16", label: "Mobile (9:16)" },
  { value: "9:21", label: "Mobile Ultrawide (9:21)" },
];

export const outputFormats: OutputFormat[] = [
  { value: "webp", label: "WebP" },
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" },
];

export const IMAGE_BUCKET_NAME = "generated_images";
