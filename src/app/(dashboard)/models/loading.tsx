import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ModelsLoading() {
  return (
    <ScrollArea className="h-full">
      <section className="container mx-auto">
        <Skeleton className="h-10 sm:w-48 w-32 mb-1" />
        <Skeleton className="h-6 sm:w-96 w-60 mb-6" />

        <div className="sm:columns-4 columns-2 gap-4 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="break-inside-avoid">
              <Skeleton className="w-full h-[300px] rounded" />
            </div>
          ))}
        </div>
      </section>
    </ScrollArea>
  );
}
