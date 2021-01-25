const jestExpect = require('expect');
const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  setPickerValue,
  setDateTimePickerValue,
  scrollTo,
} = require('../utils');

describe('JobHistory Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToJobHistoryScreen();
  });

  const navigateToJobHistoryScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('jobHistoryEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('jobHistoryEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('jobHistoryScreen');
  };

  it('should allow you to create, update, and delete the JobHistory entity', async () => {
    await expect(element(by.id('jobHistoryScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('jobHistoryEditScrollView');
    await scrollTo('startDateInput', 'jobHistoryEditScrollView');
    await setDateTimePickerValue('startDateInput', '2021-01-25T16:35:00-05:00', 'ISO8601');
    await scrollTo('endDateInput', 'jobHistoryEditScrollView');
    await setDateTimePickerValue('endDateInput', '2021-01-24T21:44:00-05:00', 'ISO8601');
    await scrollTo('languageInput', 'jobHistoryEditScrollView');
    await setPickerValue('languageInput', 'ENGLISH');
    await element(by.id('jobHistoryEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'jobHistoryEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('jobHistoryDetailScrollView');
    await scrollTo('startDate', 'jobHistoryDetailScrollView');
    const startDateCreateAttributes = await element(by.id('startDate')).getAttributes();
    jestExpect(Date.parse(startDateCreateAttributes.label)).toEqual(Date.parse('2021-01-25T16:35:00-05:00'));
    await scrollTo('endDate', 'jobHistoryDetailScrollView');
    const endDateCreateAttributes = await element(by.id('endDate')).getAttributes();
    jestExpect(Date.parse(endDateCreateAttributes.label)).toEqual(Date.parse('2021-01-24T21:44:00-05:00'));
    await scrollTo('language', 'jobHistoryDetailScrollView');
    await expect(element(by.id('language'))).toHaveLabel('ENGLISH');

    // update
    await scrollTo('jobHistoryEditButton', 'jobHistoryDetailScrollView');
    await tapFirstElementByLabel('JobHistory Edit Button');
    await waitForElementToBeVisibleById('jobHistoryEditScrollView');
    await scrollTo('startDateInput', 'jobHistoryEditScrollView');
    await setDateTimePickerValue('startDateInput', '2021-01-25T15:22:00-05:00', 'ISO8601');
    await scrollTo('endDateInput', 'jobHistoryEditScrollView');
    await setDateTimePickerValue('endDateInput', '2021-01-25T06:11:00-05:00', 'ISO8601');
    await scrollTo('languageInput', 'jobHistoryEditScrollView');
    await setPickerValue('languageInput', 'SPANISH');
    await element(by.id('jobHistoryEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'jobHistoryEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('jobHistoryDetailScrollView');
    await scrollTo('startDate', 'jobHistoryDetailScrollView');
    const startDateUpdateAttributes = await element(by.id('startDate')).getAttributes();
    jestExpect(Date.parse(startDateUpdateAttributes.label)).toEqual(Date.parse('2021-01-25T15:22:00-05:00'));
    await scrollTo('endDate', 'jobHistoryDetailScrollView');
    const endDateUpdateAttributes = await element(by.id('endDate')).getAttributes();
    jestExpect(Date.parse(endDateUpdateAttributes.label)).toEqual(Date.parse('2021-01-25T06:11:00-05:00'));
    await scrollTo('language', 'jobHistoryDetailScrollView');
    await expect(element(by.id('language'))).toHaveLabel('SPANISH');

    // delete
    await scrollTo('jobHistoryDeleteButton', 'jobHistoryDetailScrollView');
    await tapFirstElementByLabel('JobHistory Delete Button');
    await waitForElementToBeVisibleById('jobHistoryDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('jobHistoryScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
