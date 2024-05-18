import FullWidthContentTemplate from "../components/templates/FullWidthContentTemplate";
import CapabilityComparison from "../components/organisms/CapabilityComparison";
import { CapabilityComparisonProvider } from "../contexts/CapabilityComparison";

function CapabilityComparisonPage() {
  return (
    <CapabilityComparisonProvider>
      <FullWidthContentTemplate content={<CapabilityComparison />} />
    </CapabilityComparisonProvider>
  );
}

export default CapabilityComparisonPage;
