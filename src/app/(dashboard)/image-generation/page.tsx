import { ConfigurationsForm } from "@/features/image-generation/components/configurations-form";
import { ImageArea } from "@/features/image-generation/components/image-area";
import { fetchModels } from "@/features/models/actions/fetch-models-action";

interface SearchParams {
  model_id?: string;
}

interface ImageGenerationPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ImageGenerationPage({
  searchParams,
}: ImageGenerationPageProps) {
  const model_id = (await searchParams).model_id;

  const { data: userModels } = await fetchModels();

  return (
    <section className="h-full container mx-auto grid gap-4 grid-cols-3 overflow-hidden">
      {/* Form */}
      <div className="h-full overflow-auto">
        <ConfigurationsForm userModels={userModels || []} model_id={model_id} />
      </div>

      {/* Output Image */}
      <div className="col-span-2 rounded-lg h-full">
        <ImageArea />
      </div>
    </section>
  );
}
