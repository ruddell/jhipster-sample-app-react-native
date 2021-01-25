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
  setDateTimePickerValue,
  scrollTo,
} = require('../utils');

describe('Employee Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToEmployeeScreen();
  });

  const navigateToEmployeeScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('employeeEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('employeeEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('employeeScreen');
  };

  it('should allow you to create, update, and delete the Employee entity', async () => {
    await expect(element(by.id('employeeScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('employeeEditScrollView');
    await scrollTo('firstNameInput', 'employeeEditScrollView');
    await element(by.id('firstNameInput')).replaceText('Bennett');
    await scrollTo('lastNameInput', 'employeeEditScrollView');
    await element(by.id('lastNameInput')).replaceText('Bogan');
    await scrollTo('emailInput', 'employeeEditScrollView');
    await element(by.id('emailInput')).replaceText('Jayne_Cormier25@hotmail.com');
    await scrollTo('phoneNumberInput', 'employeeEditScrollView');
    await element(by.id('phoneNumberInput')).replaceText('drive');
    await scrollTo('hireDateInput', 'employeeEditScrollView');
    await setDateTimePickerValue('hireDateInput', '2021-01-25T14:11:00-05:00', 'ISO8601');
    await scrollTo('salaryInput', 'employeeEditScrollView');
    await element(by.id('salaryInput')).replaceText('2602');
    await scrollTo('commissionPctInput', 'employeeEditScrollView');
    await element(by.id('commissionPctInput')).replaceText('82226');
    await element(by.id('employeeEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'employeeEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('employeeDetailScrollView');
    await scrollTo('firstName', 'employeeDetailScrollView');
    await expect(element(by.id('firstName'))).toHaveLabel('Bennett');
    await scrollTo('lastName', 'employeeDetailScrollView');
    await expect(element(by.id('lastName'))).toHaveLabel('Bogan');
    await scrollTo('email', 'employeeDetailScrollView');
    await expect(element(by.id('email'))).toHaveLabel('Jayne_Cormier25@hotmail.com');
    await scrollTo('phoneNumber', 'employeeDetailScrollView');
    await expect(element(by.id('phoneNumber'))).toHaveLabel('drive');
    await scrollTo('hireDate', 'employeeDetailScrollView');
    const hireDateCreateAttributes = await element(by.id('hireDate')).getAttributes();
    jestExpect(Date.parse(hireDateCreateAttributes.label)).toEqual(Date.parse('2021-01-25T14:11:00-05:00'));
    await scrollTo('salary', 'employeeDetailScrollView');
    await expect(element(by.id('salary'))).toHaveLabel('2602');
    await scrollTo('commissionPct', 'employeeDetailScrollView');
    await expect(element(by.id('commissionPct'))).toHaveLabel('82226');

    // update
    await scrollTo('employeeEditButton', 'employeeDetailScrollView');
    await tapFirstElementByLabel('Employee Edit Button');
    await waitForElementToBeVisibleById('employeeEditScrollView');
    await scrollTo('firstNameInput', 'employeeEditScrollView');
    await element(by.id('firstNameInput')).replaceText('Bennett');
    await scrollTo('lastNameInput', 'employeeEditScrollView');
    await element(by.id('lastNameInput')).replaceText('Bogan');
    await scrollTo('emailInput', 'employeeEditScrollView');
    await element(by.id('emailInput')).replaceText('Jayne_Cormier25@hotmail.com');
    await scrollTo('phoneNumberInput', 'employeeEditScrollView');
    await element(by.id('phoneNumberInput')).replaceText('drive');
    await scrollTo('hireDateInput', 'employeeEditScrollView');
    await setDateTimePickerValue('hireDateInput', '2021-01-25T16:24:00-05:00', 'ISO8601');
    await scrollTo('salaryInput', 'employeeEditScrollView');
    await element(by.id('salaryInput')).replaceText('49944');
    await scrollTo('commissionPctInput', 'employeeEditScrollView');
    await element(by.id('commissionPctInput')).replaceText('60181');
    await element(by.id('employeeEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'employeeEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('employeeDetailScrollView');
    await scrollTo('firstName', 'employeeDetailScrollView');
    await expect(element(by.id('firstName'))).toHaveLabel('Bennett');
    await scrollTo('lastName', 'employeeDetailScrollView');
    await expect(element(by.id('lastName'))).toHaveLabel('Bogan');
    await scrollTo('email', 'employeeDetailScrollView');
    await expect(element(by.id('email'))).toHaveLabel('Jayne_Cormier25@hotmail.com');
    await scrollTo('phoneNumber', 'employeeDetailScrollView');
    await expect(element(by.id('phoneNumber'))).toHaveLabel('drive');
    await scrollTo('hireDate', 'employeeDetailScrollView');
    const hireDateUpdateAttributes = await element(by.id('hireDate')).getAttributes();
    jestExpect(Date.parse(hireDateUpdateAttributes.label)).toEqual(Date.parse('2021-01-25T16:24:00-05:00'));
    await scrollTo('salary', 'employeeDetailScrollView');
    await expect(element(by.id('salary'))).toHaveLabel('49944');
    await scrollTo('commissionPct', 'employeeDetailScrollView');
    await expect(element(by.id('commissionPct'))).toHaveLabel('60181');

    // delete
    await scrollTo('employeeDeleteButton', 'employeeDetailScrollView');
    await tapFirstElementByLabel('Employee Delete Button');
    await waitForElementToBeVisibleById('employeeDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('employeeScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
