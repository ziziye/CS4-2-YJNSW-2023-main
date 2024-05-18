import React from 'react';
import { render } from '@testing-library/react';
import RoleResources from './RoleResources';

// Mock the roleActivities data
const roleActivitiesData = {
  data: {
    attributes: {
      resources: {
        data: [
          {
            id: 1,
            attributes: {
              document: {
                data: {
                  attributes: {
                    url: 'https://example.com',
                    caption: 'Example Document',
                  },
                },
              },
              description: 'Resource Description 1',
            },
          },
          {
            id: 2,
            attributes: {
              description: 'Resource Description 2',
            },
          },
        ],
      },
    },
  },
};

const strapiBaseURL = process.env.REACT_APP_STRAPI_BASE_URL;

describe('RoleResources Component', () => {
  it('renders resources when they are available', () => {
    const { getByText, getByRole } = render(
      <RoleResources roleActivities={roleActivitiesData} strapiBaseURL={strapiBaseURL} />
    );

    // Expect the "Resources" header
    expect(getByText('Resources')).toBeInTheDocument();

    // Expect the table to be present
    const table = getByRole('table');
    expect(table).toBeInTheDocument();

    // Expect the first resource link and description to be present
    expect(getByText('Example Document')).toHaveAttribute(
      'href',
      'https://example.com'
    );
    expect(getByText('Resource Description 1')).toBeInTheDocument();

    // Expect the second resource description to be present
    expect(getByText('Resource Description 2')).toBeInTheDocument();
  });

  it('renders "No Resources" when no resources are available', () => {
    const { getByText } = render(
      <RoleResources roleActivities={{ data: { attributes: { resources: { data: [] } } }}}
        strapiBaseURL={strapiBaseURL}
      />
    );

    // Expect the "Resources" header
    expect(getByText('Resources')).toBeInTheDocument();

    // Expect "No Resources" text
    expect(getByText('No Resources')).toBeInTheDocument();
  });
});
