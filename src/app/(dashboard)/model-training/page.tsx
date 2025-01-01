import ModelTrainingForm from "@/features/models/components/model-training-form";
import { TrainingBanner } from "@/features/models/components/training-banner";

export default function ModelTrainingPage() {
  return (
    <section className="h-full container mx-auto grid gap-4 sm:grid-cols-2 grid-cols-1 overflow-hidden">
      {/* Form */}
      <div className="h-full overflow-auto">
        <ModelTrainingForm />
      </div>

      {/* Output Image */}
      <div className="rounded-lg h-full sm:flex hidden">
        <TrainingBanner />
      </div>
    </section>
  );
}
