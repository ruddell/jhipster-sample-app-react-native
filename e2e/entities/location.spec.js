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

describe('Location Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToLocationScreen();
  });

  const navigateToLocationScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('locationEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('locationEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('locationScreen');
  };

  it('should allow you to create, update, and delete the Location entity', async () => {
    await expect(element(by.id('locationScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('locationEditScrollView');
    await scrollTo('streetAddressInput', 'locationEditScrollView');
    await element(by.id('streetAddressInput')).replaceText('Bacon');
    await scrollTo('postalCodeInput', 'locationEditScrollView');
    await element(by.id('postalCodeInput')).replaceText('Multi-channelled brand');
    await scrollTo('cityInput', 'locationEditScrollView');
    await element(by.id('cityInput')).replaceText('Harmonystad');
    await scrollTo('stateProvinceInput', 'locationEditScrollView');
    await element(by.id('stateProvinceInput')).replaceText('Ngultrum');
    await element(by.id('locationEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'locationEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('locationDetailScrollView');
    await scrollTo('streetAddress', 'locationDetailScrollView');
    await expect(element(by.id('streetAddress'))).toHaveLabel('Bacon');
    await scrollTo('postalCode', 'locationDetailScrollView');
    await expect(element(by.id('postalCode'))).toHaveLabel('Multi-channelled brand');
    await scrollTo('city', 'locationDetailScrollView');
    await expect(element(by.id('city'))).toHaveLabel('Harmonystad');
    await scrollTo('stateProvince', 'locationDetailScrollView');
    await expect(element(by.id('stateProvince'))).toHaveLabel('Ngultrum');

    // update
    await scrollTo('locationEditButton', 'locationDetailScrollView');
    await tapFirstElementByLabel('Location Edit Button');
    await waitForElementToBeVisibleById('locationEditScrollView');
    await scrollTo('streetAddressInput', 'locationEditScrollView');
    await element(by.id('streetAddressInput')).replaceText('Bacon');
    await scrollTo('postalCodeInput', 'locationEditScrollView');
    await element(by.id('postalCodeInput')).replaceText('Multi-channelled brand');
    await scrollTo('cityInput', 'locationEditScrollView');
    await element(by.id('cityInput')).replaceText('Harmonystad');
    await scrollTo('stateProvinceInput', 'locationEditScrollView');
    await element(by.id('stateProvinceInput')).replaceText('Ngultrum');
    await element(by.id('locationEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'locationEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('locationDetailScrollView');
    await scrollTo('streetAddress', 'locationDetailScrollView');
    await expect(element(by.id('streetAddress'))).toHaveLabel('Bacon');
    await scrollTo('postalCode', 'locationDetailScrollView');
    await expect(element(by.id('postalCode'))).toHaveLabel('Multi-channelled brand');
    await scrollTo('city', 'locationDetailScrollView');
    await expect(element(by.id('city'))).toHaveLabel('Harmonystad');
    await scrollTo('stateProvince', 'locationDetailScrollView');
    await expect(element(by.id('stateProvince'))).toHaveLabel('Ngultrum');

    // delete
    await scrollTo('locationDeleteButton', 'locationDetailScrollView');
    await tapFirstElementByLabel('Location Delete Button');
    await waitForElementToBeVisibleById('locationDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('locationScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
