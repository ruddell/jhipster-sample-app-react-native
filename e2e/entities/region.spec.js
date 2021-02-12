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

describe('Region Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToRegionScreen();
  });

  const navigateToRegionScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('regionEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('regionEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('regionScreen');
  };

  it('should allow you to create, update, and delete the Region entity', async () => {
    await expect(element(by.id('regionScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('regionEditScrollView');
    await scrollTo('regionNameInput', 'regionEditScrollView');
    await element(by.id('regionNameInput')).replaceText('Quality-focused niches');
    await element(by.id('regionEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'regionEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('regionDetailScrollView');
    await scrollTo('regionName', 'regionDetailScrollView');
    await expect(element(by.id('regionName'))).toHaveLabel('Quality-focused niches');

    // update
    await scrollTo('regionEditButton', 'regionDetailScrollView');
    await tapFirstElementByLabel('Region Edit Button');
    await waitForElementToBeVisibleById('regionEditScrollView');
    await scrollTo('regionNameInput', 'regionEditScrollView');
    await element(by.id('regionNameInput')).replaceText('Quality-focused niches');
    await element(by.id('regionEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'regionEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('regionDetailScrollView');
    await scrollTo('regionName', 'regionDetailScrollView');
    await expect(element(by.id('regionName'))).toHaveLabel('Quality-focused niches');

    // delete
    await scrollTo('regionDeleteButton', 'regionDetailScrollView');
    await tapFirstElementByLabel('Region Delete Button');
    await waitForElementToBeVisibleById('regionDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('regionScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
