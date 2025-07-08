require('@testing-library/jest-dom');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => { });
});

global.customElements = global.customElements || window.customElements || {
  define: () => { },
  get: () => { }
};

window.ShadowRoot = window.ShadowRoot || class { };
window.HTMLSlotElement = window.HTMLSlotElement || class { };