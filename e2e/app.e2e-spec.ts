import { TodolistAngularjs2Page } from './app.po';

describe('todolist-angularjs2 App', () => {
  let page: TodolistAngularjs2Page;

  beforeEach(() => {
    page = new TodolistAngularjs2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
