import { InterventionWebAppPage } from './app.po';

describe('intervention-web-app App', () => {
  let page: InterventionWebAppPage;

  beforeEach(() => {
    page = new InterventionWebAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
