import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchModels } from "@/features/models/actions/fetch-models-action";
import { ModelsList } from "@/features/models/components/models-list";

export default async function ModelsPage() {
  const data = await fetchModels();

  return (
    <ScrollArea className="h-full">
      <section className="container mx-auto">
        <h1 className="font-heading text-3xl font-bold mb-1">My Models</h1>
        <p className="text-sm text-muted-foreground mb-6">
          View and Manage your trained models
        </p>
      </section>

      <ModelsList models={data} />
    </ScrollArea>
  );
}
