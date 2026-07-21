function createVolunteerForm() {
  const form = FormApp.create('SJBEF Scholarship Program – Summary of Volunteer Service')
    .setDescription('Return with scholarship application. Please list all leadership roles and volunteer services.');

  // Section 1: Student Leadership Positions
  form.addSectionHeaderItem().setTitle('Section 1: Student Leadership Positions');
  form.addTextItem().setTitle('Please list all leadership roles, name of organizations and years served. If necessary, add additional entries below.')
    .setHelpText('Add as many entries as needed using the buttons below.');

  // Create 6 rows for leadership positions with repeatable structure
  for (let i = 1; i <= 6; i++) {
    form.addTextItem().setTitle(`Leadership Role ${i} - Year(s) served`).setHelpText('e.g., 2022-2023');
    form.addTextItem().setTitle(`Leadership Role ${i} - Name of organization`);
    form.addTextItem().setTitle(`Leadership Role ${i} - Leadership role within organization`);
  }

  // Section 2: Student Volunteer Services
  form.addSectionHeaderItem().setTitle('Section 2: Student Volunteer Services');
  form.addTextItem().setTitle('Please list the organizations you volunteered for and what your contribution was towards their mission.')
    .setHelpText('Preference will be given to students who performed volunteer hours for a Catholic Financial Life chapter; and/or Saint Vincent de Paul Society; local parish or a non-profit organization. Add as many entries as needed using the buttons below.');

  // Create 6 rows for volunteer services with repeatable structure
  for (let i = 1; i <= 6; i++) {
    form.addTextItem().setTitle(`Volunteer Service ${i} - Year(s) served`).setHelpText('e.g., 2022-2023');
    form.addTextItem().setTitle(`Volunteer Service ${i} - Name of organization`);
    form.addTextItem().setTitle(`Volunteer Service ${i} - Volunteer Service`).setHelpText('Describe your contribution to the organization\'s mission');
  }

  // Finalize
  Logger.log('Form edit URL: %s', form.getEditUrl());
  Logger.log('Form public URL: %s', form.getPublishedUrl());
  Logger.log('Embed iframe (replace FORM_ID): <iframe src="https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true" width="640" height="1200" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>');
}
