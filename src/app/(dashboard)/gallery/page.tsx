import { ScrollArea } from "@/components/ui/scroll-area";
import { getImagesAction } from "@/features/gallery/actions/get-images-action";
import { Gallery } from "@/features/gallery/components/gallery-components";

export default async function GalleryPage() {
  const { data: images } = await getImagesAction();

  return (
    <ScrollArea className="h-full">
      <section className="container mx-auto">
        <h1 className="font-heading text-3xl font-semibold mb-1">My Images</h1>
        <p className="text-muted-foreground mb-6">
          Here you can see all images you have generated. Click on images to
          view details
        </p>

        <Gallery images={images || []} />
      </section>
    </ScrollArea>
  );
}
