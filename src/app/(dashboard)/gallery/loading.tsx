import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function GalleryLoading() {
  return (
    <ScrollArea className="h-full">
      <section className="container mx-auto">
        <Skeleton className="h-10 w-48 mb-1" />
        <Skeleton className="h-6 w-96 mb-6" />

        <div className="columns-4 gap-4 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="break-inside-avoid">
              <Skeleton className="w-full h-[300px] rounded" />
            </div>
          ))}
        </div>
      </section>
    </ScrollArea>
  );
} 