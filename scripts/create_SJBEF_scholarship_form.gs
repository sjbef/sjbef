/**
 * Automatically generates the official Saint-Jean-Baptiste Educational Foundation
 * Scholarship Application Google Form.
 */
function createSJBEFScholarshipForm() {
  // Create a brand new Google Form
  var form = FormApp.create('SJBEF Scholarship Application');

  // Set the title and header description
  form.setTitle('Saint-Jean-Baptiste Educational Foundation - Scholarship Application');
  form.setDescription(
    'The Saint-Jean-Baptiste Educational Foundation (SJBEF) is a historic 501(c)(3) nonprofit dedicated to promoting the French language, preserving Franco-American culture in New England, and awarding higher education scholarships to deserving students.\n\n' +
    'ELIGIBILITY REQUIREMENTS:\n' +
    '1. Must be of French-Canadian or Franco-American descent, OR actively pursuing French or Francophone studies.\n' +
    '2. Must reside in New England (RI, MA, CT, NH, VT, or ME).\n' +
    '3. Enrolled or accepted in an accredited Catholic high school, or an accredited 2-year or 4-year college/university/trade school.\n' +
    '4. Submission of transcripts, a letter of recommendation, and a personal essay on your heritage or studies.\n\n' +
    'Deadline: April 30th annually.'
  );

  // SECTION 1: Applicant Information
  form.addSectionHeaderItem().setTitle('Section 1: Applicant Information');

  form.addTextItem().setTitle('Applicant Full Name').setRequired(true);
  form.addDateItem().setTitle('Date of Birth').setRequired(true);
  form.addParagraphTextItem().setTitle('Mailing Address (Street, City, State, ZIP)').setRequired(true);
  form.addTextItem().setTitle('Phone Number').setRequired(true);
  form.addTextItem().setTitle('Email Address').setRequired(true);

  var stateChoice = form.addMultipleChoiceItem();
  stateChoice.setTitle('State of New England Residence')
             .setChoiceValues(['Rhode Island', 'Massachusetts', 'Connecticut', 'New Hampshire', 'Vermont', 'Maine'])
             .setRequired(true);

  // SECTION 2: Academic Profile
  form.addPageBreakItem().setTitle('Section 2: Academic Profile');

  var eduLevel = form.addMultipleChoiceItem();
  eduLevel.setTitle('Current Education Level')
          .setChoiceValues(['High School Senior', 'College Undergraduate', 'Graduate Student', 'Seminarian'])
          .setRequired(true);

  form.addTextItem().setTitle('School Currently Attending').setRequired(true);
  form.addTextItem().setTitle('School Attending/Planning to Attend in the Fall').setRequired(true);
  form.addTextItem().setTitle('Anticipated Graduation Year').setRequired(true);
  form.addTextItem().setTitle('Current Cumulative GPA / Class Rank').setRequired(true);
  form.addTextItem().setTitle('Intended Major / Field of Study').setRequired(true);

  // SECTION 3: Eligibility & Heritage
  form.addPageBreakItem().setTitle('Section 3: Eligibility & Heritage');

  var eligibility = form.addCheckboxItem();
  eligibility.setTitle('Eligibility Category (Check all that apply)')
             .setChoiceValues([
               'I am of French-Canadian / Franco-American ancestry',
               'I am actively studying the French language or Francophone literature',
               'I am enrolled in an accredited Catholic high school program with French studies',
               'I am a descendant of a Union Saint-Jean-Baptiste (USJB) member',
               'Other French cultural or linguistic affiliation'
             ])
             .setRequired(true);

  form.addParagraphTextItem()
      .setTitle('Ancestry & USJB Lineage Details')
      .setHelpText('If applying based on ancestry or USJB family lineage, please specify names of ancestors or USJB members (parents, grandparents, etc.) and their council number / chapter name if known.');

  var frenchYears = form.addMultipleChoiceItem();
  frenchYears.setTitle('Years of French Language Study')
             .setChoiceValues(['1 Year', '2 Years', '3 Years', '4 Years', '5+ Years', 'None'])
             .setRequired(true);

  form.addParagraphTextItem()
      .setTitle('Details of French Language Courses')
      .setHelpText('Describe any French language courses or Francophone cultural activities you have participated in (in school, community, or online).');

  // SECTION 4: Essay
  form.addPageBreakItem().setTitle('Section 4: Essay & Supporting Documents');

  form.addParagraphTextItem()
      .setTitle('Scholarship Essay Prompt')
      .setHelpText('How has your French heritage or study of the French language/culture shaped your worldview, educational goals, and aspirations? (In English or French, approx. 250-500 words)')
      .setRequired(true);

  // Log URLs to find the newly made form
  Logger.log('🎉 Google Form Created Successfully!');
  Logger.log('👉 Live Form URL: ' + form.getPublishedUrl());
  Logger.log('🛠️ Form Edit link: ' + form.getEditUrl());
}
