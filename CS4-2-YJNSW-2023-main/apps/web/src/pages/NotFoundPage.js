import FullWidthContentTemplate from "../components/templates/FullWidthContentTemplate";
import NotFound from "../components/organisms/NotFound";

function NotFoundPage() {
  sessionStorage.clear("SelectedGoals");
  return <FullWidthContentTemplate content={<NotFound />} />;
}

export default NotFoundPage;
