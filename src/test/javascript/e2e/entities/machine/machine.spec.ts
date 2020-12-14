import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MachineComponentsPage, MachineDeleteDialog, MachineUpdatePage } from './machine.page-object';

const expect = chai.expect;

describe('Machine e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let machineComponentsPage: MachineComponentsPage;
  let machineUpdatePage: MachineUpdatePage;
  let machineDeleteDialog: MachineDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Machines', async () => {
    await navBarPage.goToEntity('machine');
    machineComponentsPage = new MachineComponentsPage();
    await browser.wait(ec.visibilityOf(machineComponentsPage.title), 5000);
    expect(await machineComponentsPage.getTitle()).to.eq('vcApplicationApp.machine.home.title');
    await browser.wait(ec.or(ec.visibilityOf(machineComponentsPage.entities), ec.visibilityOf(machineComponentsPage.noResult)), 1000);
  });

  it('should load create Machine page', async () => {
    await machineComponentsPage.clickOnCreateButton();
    machineUpdatePage = new MachineUpdatePage();
    expect(await machineUpdatePage.getPageTitle()).to.eq('vcApplicationApp.machine.home.createOrEditLabel');
    await machineUpdatePage.cancel();
  });

  it('should create and save Machines', async () => {
    const nbButtonsBeforeCreate = await machineComponentsPage.countDeleteButtons();

    await machineComponentsPage.clickOnCreateButton();

    await promise.all([machineUpdatePage.setNameInput('name'), machineUpdatePage.setDescriptionInput('description')]);

    expect(await machineUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await machineUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');

    await machineUpdatePage.save();
    expect(await machineUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await machineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Machine', async () => {
    const nbButtonsBeforeDelete = await machineComponentsPage.countDeleteButtons();
    await machineComponentsPage.clickOnLastDeleteButton();

    machineDeleteDialog = new MachineDeleteDialog();
    expect(await machineDeleteDialog.getDialogTitle()).to.eq('vcApplicationApp.machine.delete.question');
    await machineDeleteDialog.clickOnConfirmButton();

    expect(await machineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
