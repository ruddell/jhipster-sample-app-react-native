const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  scrollTo,
} = require('../utils');

describe('Task Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToTaskScreen();
  });

  const navigateToTaskScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('taskEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('taskEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('taskScreen');
  };

  it('should allow you to create, update, and delete the Task entity', async () => {
    await expect(element(by.id('taskScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('taskEditScrollView');
    await scrollTo('titleInput', 'taskEditScrollView');
    await element(by.id('titleInput')).replaceText('Grocery USB');
    await scrollTo('descriptionInput', 'taskEditScrollView');
    await element(by.id('descriptionInput')).replaceText('mobile Ohio Rupee');
    await element(by.id('taskEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'taskEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('taskDetailScrollView');
    await scrollTo('title', 'taskDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('Grocery USB');
    await scrollTo('description', 'taskDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('mobile Ohio Rupee');

    // update
    await scrollTo('taskEditButton', 'taskDetailScrollView');
    await tapFirstElementByLabel('Task Edit Button');
    await waitForElementToBeVisibleById('taskEditScrollView');
    await scrollTo('titleInput', 'taskEditScrollView');
    await element(by.id('titleInput')).replaceText('Grocery USB');
    await scrollTo('descriptionInput', 'taskEditScrollView');
    await element(by.id('descriptionInput')).replaceText('mobile Ohio Rupee');
    await element(by.id('taskEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'taskEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('taskDetailScrollView');
    await scrollTo('title', 'taskDetailScrollView');
    await expect(element(by.id('title'))).toHaveLabel('Grocery USB');
    await scrollTo('description', 'taskDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('mobile Ohio Rupee');

    // delete
    await scrollTo('taskDeleteButton', 'taskDetailScrollView');
    await tapFirstElementByLabel('Task Delete Button');
    await waitForElementToBeVisibleById('taskDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('taskScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
