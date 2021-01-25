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

describe('Job Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToJobScreen();
  });

  const navigateToJobScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('jobEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('jobEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('jobScreen');
  };

  it('should allow you to create, update, and delete the Job entity', async () => {
    await expect(element(by.id('jobScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('jobEditScrollView');
    await scrollTo('jobTitleInput', 'jobEditScrollView');
    await element(by.id('jobTitleInput')).replaceText('National Creative Manager');
    await scrollTo('minSalaryInput', 'jobEditScrollView');
    await element(by.id('minSalaryInput')).replaceText('63336');
    await scrollTo('maxSalaryInput', 'jobEditScrollView');
    await element(by.id('maxSalaryInput')).replaceText('46379');
    await element(by.id('jobEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'jobEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('jobDetailScrollView');
    await scrollTo('jobTitle', 'jobDetailScrollView');
    await expect(element(by.id('jobTitle'))).toHaveLabel('National Creative Manager');
    await scrollTo('minSalary', 'jobDetailScrollView');
    await expect(element(by.id('minSalary'))).toHaveLabel('63336');
    await scrollTo('maxSalary', 'jobDetailScrollView');
    await expect(element(by.id('maxSalary'))).toHaveLabel('46379');

    // update
    await scrollTo('jobEditButton', 'jobDetailScrollView');
    await tapFirstElementByLabel('Job Edit Button');
    await waitForElementToBeVisibleById('jobEditScrollView');
    await scrollTo('jobTitleInput', 'jobEditScrollView');
    await element(by.id('jobTitleInput')).replaceText('National Creative Manager');
    await scrollTo('minSalaryInput', 'jobEditScrollView');
    await element(by.id('minSalaryInput')).replaceText('16503');
    await scrollTo('maxSalaryInput', 'jobEditScrollView');
    await element(by.id('maxSalaryInput')).replaceText('88068');
    await element(by.id('jobEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'jobEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('jobDetailScrollView');
    await scrollTo('jobTitle', 'jobDetailScrollView');
    await expect(element(by.id('jobTitle'))).toHaveLabel('National Creative Manager');
    await scrollTo('minSalary', 'jobDetailScrollView');
    await expect(element(by.id('minSalary'))).toHaveLabel('16503');
    await scrollTo('maxSalary', 'jobDetailScrollView');
    await expect(element(by.id('maxSalary'))).toHaveLabel('88068');

    // delete
    await scrollTo('jobDeleteButton', 'jobDetailScrollView');
    await tapFirstElementByLabel('Job Delete Button');
    await waitForElementToBeVisibleById('jobDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('jobScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
