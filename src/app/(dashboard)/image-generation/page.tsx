import { ConfigurationsForm } from "@/features/image-generation/components/configurations-form";
import { ImageArea } from "@/features/image-generation/components/image-area";

export default function ImageGenerationPage() {
  return (
    <section className="h-full container mx-auto grid gap-4 grid-cols-3 overflow-hidden">
      {/* Form */}
      <div className="h-full overflow-auto">
        <ConfigurationsForm />
      </div>

      {/* Output Image */}
      <div className="col-span-2 rounded-lg h-full">
        <ImageArea />
      </div>
    </section>
  );
}
