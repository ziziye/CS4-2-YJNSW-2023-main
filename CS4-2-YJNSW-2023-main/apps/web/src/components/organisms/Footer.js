import { Footer as NswFooter, FooterLinks, FooterLower } from "nsw-ds-react";

function Footer() {
  return (
    <div>
      <NswFooter>
        <FooterLower>
          <div className="nsw-container">
            <p>
              We pay respect to the Traditional Custodians and First Peoples of NSW, and acknowledge
              their continued connection to their country and culture.
            </p>
            <hr />
            <FooterLinks
              footerLinks={[
                {
                  url: "#",
                  text: "Privacy",
                },
                {
                  url: "#",
                  text: "Website Accessibility",
                },
                {
                  url: "#",
                  text: "Copyright and Disclaimer",
                },
              ]}
            />
            <p>Copyright © 2022</p>
          </div>
        </FooterLower>
      </NswFooter>
    </div>
  );
}

export default Footer;
