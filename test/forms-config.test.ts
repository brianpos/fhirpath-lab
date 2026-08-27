import { parseFormsConfiguration } from '../helpers/forms_config';

describe('parseFormsConfiguration', () => {
  it('normalizes relative renderer URLs against the supplied base URL', () => {
    const result = parseFormsConfiguration({
      renderers: [{
        tabName: 'Test Renderer',
        title: 'Test title',
        organization: 'Test organization',
        smartWebMessagingUrl: '/renderer'
      }]
    }, 'https://example.test/Questionnaire/tester');

    expect(result.renderers[0].smartWebMessagingUrl).toBe('https://example.test/renderer');
  });

  it('rejects duplicate tab names case-insensitively', () => {
    expect(() => parseFormsConfiguration({
      renderers: [
        {
          tabName: 'Renderer',
          title: 'First',
          organization: 'First organization',
          smartWebMessagingUrl: '/first'
        },
        {
          tabName: 'renderer',
          title: 'Second',
          organization: 'Second organization',
          smartWebMessagingUrl: '/second'
        }
      ]
    }, 'https://example.test/')).toThrow('duplicated');
  });

  it('rejects missing required renderer properties', () => {
    expect(() => parseFormsConfiguration({
      renderers: [{
        tabName: 'Renderer',
        title: '',
        organization: 'Test organization',
        smartWebMessagingUrl: '/renderer'
      }]
    }, 'https://example.test/')).toThrow('requires a non-empty title');
  });

  it('rejects renderer URLs that are not HTTP or HTTPS', () => {
    expect(() => parseFormsConfiguration({
      renderers: [{
        tabName: 'Renderer',
        title: 'Test title',
        organization: 'Test organization',
        smartWebMessagingUrl: 'javascript:alert(1)'
      }]
    }, 'https://example.test/')).toThrow('invalid smartWebMessagingUrl');
  });

  it('rejects names that collide after tester slot normalization', () => {
    expect(() => parseFormsConfiguration({
      renderers: [
        {
          tabName: 'A B',
          title: 'First',
          organization: 'First organization',
          smartWebMessagingUrl: '/first'
        },
        {
          tabName: 'A_B',
          title: 'Second',
          organization: 'Second organization',
          smartWebMessagingUrl: '/second'
        }
      ]
    }, 'https://example.test/')).toThrow('conflicts with another tab slot');
  });

  it('rejects names reserved by existing tester tabs', () => {
    expect(() => parseFormsConfiguration({
      renderers: [{
        tabName: 'Response',
        title: 'Test title',
        organization: 'Test organization',
        smartWebMessagingUrl: '/renderer'
      }]
    }, 'https://example.test/', ['Response'])).toThrow('duplicated or reserved');
  });
});
