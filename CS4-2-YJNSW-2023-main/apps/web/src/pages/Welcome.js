import { Section } from "nsw-ds-react";
import WelcomeBanner from "../components/molecules/WelcomeBanner";
import WelcomeOptions from "../components/molecules/WelcomeOptions";
import BaseTemplate from "../components/templates/BaseTemplate";

function Welcome() {
  sessionStorage.clear("SelectedGoals");
  return (
    <BaseTemplate
      content={
        <Section className="layout--halves" container={true} style="white">
          <WelcomeBanner />
          <WelcomeOptions />
        </Section>
      }
    />
  );
}

export default Welcome;
