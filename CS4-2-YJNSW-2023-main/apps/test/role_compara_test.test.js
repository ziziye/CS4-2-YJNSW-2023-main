const CareerProgressionRoleComparison = require('../web/src/components/molecules/CareerProgressionRoleComparison'); // Adjust the path to your component
const cms = require('../cms'); // Adjust the path to your API client

jest.mock('nsw-ds-react', () => ({
  Card: ({ children }) => children,
  Section: ({ children }) => children,
  Alert: ({ children }) => children,
}));

jest.mock('../web/src/contexts/CapabilityComparison', () => ({
  CapabilityComparisonContext: {
    Consumer: ({ children }) =>
      children({ capabilityTotal: [1, 2, 3] }), // Replace with appropriate data
  },
}));

jest.mock('../web/src/contexts/CareerProgression', () => ({
  CareerProgressionContext: {
    Consumer: ({ children }) =>
      children({ roleId: 4 }), // Replace with appropriate data
  },
}));

describe('CareerProgressionRoleComparison Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component', async () => {
    // Mock the response for your async functions (e.g., getRoleCapability and getCapabilities)
    const mockFromRoleInfo = { data: { attributes: { roleName: 'From Role' } } };
    const mockToRoleInfo = { data: { attributes: { roleName: 'To Role' } } };
    const mockCapabilityInfo = { data: [] };

    cms.getRoleCapability = jest.fn().mockResolvedValue(mockFromRoleInfo);
    cms.getCapabilities = jest.fn().mockResolvedValue(mockCapabilityInfo);

    const role = { attributes: { roleName: 'Test Role', longDesc: 'Test Description' } };
    const currentRole = { attributes: { roleName: 'Current Role', longDesc: 'Current Role Description' } };

    const component = new CareerProgressionRoleComparison({ role, currentRole });
    component.componentDidMount(); // Simulate component mount

    // Verify that key elements are present in the component
    expect(component.toRoleInfo.data.attributes.roleName).toBe('To Role');
  });

  it('should trigger the print function when the print button is clicked', () => {
    window.print = jest.fn(); // Mock the window.print function

    const role = { attributes: { roleName: 'Test Role', longDesc: 'Test Description' } };
    const currentRole = { attributes: { roleName: 'Current Role', longDesc: 'Current Role Description' } };

    const component = new CareerProgressionRoleComparison({ role, currentRole });
    component.render(); // Simulate component render

    const printButton = component.wrapper.find('button').at(0); // Adjust the selector
    printButton.simulate('click');
    
    expect(window.print).toHaveBeenCalled();
  });

  it('should expand and collapse the accordion', async () => {
    const role = { attributes: { roleName: 'Test Role', longDesc: 'Test Description' } };
    const currentRole = { attributes: { roleName: 'Current Role', longDesc: 'Current Role Description' } };

    const component = new CareerProgressionRoleComparison({ role, currentRole });
    component.render(); // Simulate component render

    const expandButton = component.wrapper.find('button').at(1); // Adjust the selector
    const collapseButton = component.wrapper.find('button').at(2); // Adjust the selector

    // Initially, the accordion should be collapsed
    expect(component.wrapper.find('.capability-accordion-item').length).toBe(0);

    expandButton.simulate('click');
    component.update(); // Update the component

    // After clicking Expand All, the accordion should be expanded
    expect(component.wrapper.find('.capability-accordion-item').length).toBeGreaterThan(0);

    collapseButton.simulate('click');
    component.update(); // Update the component

    // After clicking Collapse All, the accordion should be collapsed again
    expect(component.wrapper.find('.capability-accordion-item').length).toBe(0);
  });
});
