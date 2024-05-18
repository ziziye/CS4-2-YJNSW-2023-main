import apis, { getSearchQueryParams, getRoleProgressionQueryParams } from '../cms/src/api-clients/cms';

describe('API Functions', () => {
  // Mock the fetch function for testing
  global.fetch = jest.fn();

  beforeEach(() => {
    global.fetch.mockClear();
  });

  // Mock environment variables
  const originalEnv = process.env;
  beforeAll(() => {
    process.env = { ...originalEnv, REACT_APP_STRAPI_BASE_URL: process.env.REACT_APP_STRAPI_BASE_URL };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should fetch and parse title', async () => {
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue({ title: 'Test Title' }) });
    const title = await apis.getTitle();
    expect(title).toEqual({ title: 'Test Title' });
  });

  it('should fetch and parse home guide', async () => {
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue({ guide: 'Test Guide' }) });
    const guide = await apis.getHomeGuide();
    expect(guide).toEqual({ guide: 'Test Guide' });
  });


  it('should generate search query params', () => {
    const searchCriteria = {
      page: 1,
      searchTerm: 'example',
      streamFilters: ['Stream1', 'Stream2'],
      identifiedFilter: 'Identified Only',
    };
    const queryParams = getSearchQueryParams(searchCriteria);
    expect(queryParams).toContain('sort[0]=roleName');
    expect(queryParams).toContain('pagination[pageSize]=10');
    expect(queryParams).toContain('filters[roleName][$containsi]=example');
    expect(queryParams).toContain('filters[streams][streamName][$eq]=Stream1');
    expect(queryParams).toContain('filters[isIdentified][$eq]=true');
  });

  it('should generate role progression query params', () => {
    const searchCriteria = {
      searchTerm: 'example',
      streamFilters: ['Stream1', 'Stream2'],
      identifiedFilter: 'Non-Identified Only',
    };
    const queryParams = getRoleProgressionQueryParams(searchCriteria);
    expect(queryParams).toContain('pagination[pageSize]=100');
    expect(queryParams).toContain('filters[toRole][roleName][$containsi]=example');
    expect(queryParams).toContain('filters[$or][0][toRole][streams][streamName][$eq]=Stream1');
    expect(queryParams).toContain('filters[$and][1][toRole][isIdentified][$eq]=false');
  });
});
