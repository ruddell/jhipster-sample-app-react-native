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

describe('Country Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToCountryScreen();
  });

  const navigateToCountryScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('countryEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('countryEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('countryScreen');
  };

  it('should allow you to create, update, and delete the Country entity', async () => {
    await expect(element(by.id('countryScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('countryEditScrollView');
    await scrollTo('countryNameInput', 'countryEditScrollView');
    await element(by.id('countryNameInput')).replaceText('Brand');
    await element(by.id('countryEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'countryEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('countryDetailScrollView');
    await scrollTo('countryName', 'countryDetailScrollView');
    await expect(element(by.id('countryName'))).toHaveLabel('Brand');

    // update
    await scrollTo('countryEditButton', 'countryDetailScrollView');
    await tapFirstElementByLabel('Country Edit Button');
    await waitForElementToBeVisibleById('countryEditScrollView');
    await scrollTo('countryNameInput', 'countryEditScrollView');
    await element(by.id('countryNameInput')).replaceText('Brand');
    await element(by.id('countryEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'countryEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('countryDetailScrollView');
    await scrollTo('countryName', 'countryDetailScrollView');
    await expect(element(by.id('countryName'))).toHaveLabel('Brand');

    // delete
    await scrollTo('countryDeleteButton', 'countryDetailScrollView');
    await tapFirstElementByLabel('Country Delete Button');
    await waitForElementToBeVisibleById('countryDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('countryScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
