function createSeminarianForm() {
  const STATES = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

  const form = FormApp.create('Seminarian Scholarship Application - SJB Educational Foundation')
    .setDescription('Converted from https://www.sjbef.org/?page_id=845');

  // Applicant info
  form.addTextItem().setTitle('First Name').setRequired(true);
  form.addTextItem().setTitle('Last Name').setRequired(true);
  form.addTextItem().setTitle('Address').setRequired(true);
  form.addTextItem().setTitle('Address Line 2');
  form.addTextItem().setTitle('City').setRequired(true);
  form.addListItem().setTitle('State').setChoiceValues(STATES).setRequired(true);
  form.addTextItem().setTitle('Postal Code').setRequired(true);
  form.addTextItem().setTitle('Email').setRequired(true);
  form.addTextItem().setTitle('Home Phone').setRequired(true);
  form.addTextItem().setTitle('Cell Phone').setRequired(true);
  form.addDateItem().setTitle('Date of Birth').setRequired(true);
  form.addTextItem().setTitle('Place of Birth').setRequired(true);

  // Membership question (MultipleChoiceItem must create its own Choice objects)
  var m1 = form.addMultipleChoiceItem();
  m1.setTitle('Are you a member of Catholic Financial Life?')
    .setChoices([m1.createChoice('Yes'), m1.createChoice('No')])
    .setRequired(true);
  form.addTextItem().setTitle('If yes, of which Chapter, City/State?');

  // Seminary info
  form.addTextItem().setTitle('Name of Seminary you are attending?').setRequired(true);
  form.addTextItem().setTitle('Seminary Address').setRequired(true);
  form.addTextItem().setTitle('Seminary Address Line 2');
  form.addTextItem().setTitle('Seminary City').setRequired(true);
  form.addListItem().setTitle('Seminary State').setChoiceValues(STATES).setRequired(true);
  form.addTextItem().setTitle('Seminary Postal Code').setRequired(true);

  // Year of studies
  var yearItem = form.addMultipleChoiceItem();
  yearItem.setTitle('Select Year of Theological Studies')
    .setChoices([
      yearItem.createChoice('First'),
      yearItem.createChoice('Second'),
      yearItem.createChoice('Third'),
      yearItem.createChoice('Fourth'),
      yearItem.createChoice('Special')
    ]).setRequired(true);
  form.addTextItem().setTitle('Please explain if Special is selected');

  form.addTextItem().setTitle('By what diocese or religious order have you been accepted for priestly ministry after ordination?').setRequired(true);
  form.addDateItem().setTitle('Expected Ordination Date').setRequired(true);

  var prevAid = form.addMultipleChoiceItem();
  prevAid.setTitle('Have you previously received any educational financial aid from the SJB Educational Foundation?')
    .setChoices([prevAid.createChoice('Yes'), prevAid.createChoice('No')]).setRequired(true);
  form.addTextItem().setTitle('If yes, what years?');

  // Parent #1 section
  form.addSectionHeaderItem().setTitle('Parent #1 Information');
  form.addTextItem().setTitle('Parent #1 Name').setRequired(true);
  form.addTextItem().setTitle('Parent #1 Address').setRequired(true);
  form.addTextItem().setTitle('Parent #1 Address Line 2');
  form.addTextItem().setTitle('Parent #1 City').setRequired(true);
  form.addListItem().setTitle('Parent #1 State').setChoiceValues(STATES).setRequired(true);
  form.addTextItem().setTitle('Parent #1 Postal Code').setRequired(true);

  // Parent #2 section
  form.addSectionHeaderItem().setTitle('Parent #2 Information');
  form.addTextItem().setTitle('Parent #2 Name').setRequired(true);
  form.addTextItem().setTitle('Parent #2 Address').setRequired(true);
  form.addTextItem().setTitle('Parent #2 Address Line 2');
  form.addTextItem().setTitle('Parent #2 City').setRequired(true);
  form.addListItem().setTitle('Parent #2 State').setChoiceValues(STATES).setRequired(true);
  form.addTextItem().setTitle('Parent #2 Postal Code').setRequired(true);

  form.addListItem().setTitle('Number of Family Dependents Including Applicant')
      .setChoiceValues(Array.from({length:21}, (_,i)=>String(i))).setRequired(true);

  // Scholarship check delivery
  form.addSectionHeaderItem().setTitle('IMPORTANT - SCHOLARSHIP CHECK DELIVERY ADDRESS');
  form.addTextItem().setTitle('Check Delivery Address').setRequired(true);
  form.addTextItem().setTitle('Check Delivery Address Line 2');
  form.addTextItem().setTitle('Check Delivery City').setRequired(true);
  form.addListItem().setTitle('Check Delivery State').setChoiceValues(STATES).setRequired(true);
  form.addTextItem().setTitle('Check Delivery Postal Code').setRequired(true);

  // Additional fields (placeholder)
  form.addParagraphTextItem().setTitle('Additional information / Comments');

  // Finalize
  Logger.log('Form edit URL: %s', form.getEditUrl());
  Logger.log('Form public URL: %s', form.getPublishedUrl());
  Logger.log('Embed iframe (replace FORM_ID): <iframe src="https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true" width="640" height="1200" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>');
}
