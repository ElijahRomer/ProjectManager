console.log('If this is logged, then app.js is linked correctly.');

console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));


//initial render of date/time on page to maintain formatting through page load
let dateTimeEl = $('#date-time')[0];
dateTimeEl.textContent =(moment().format('MMMM Do YYYY, h:mm:ss a'));

//update every second
setInterval(updateDateTime, 1000);
function updateDateTime(){
  dateTimeEl.textContent =(moment().format('MMMM Do YYYY, h:mm:ss a'));
}


$('#due-date-picker').datepicker({
  changeMonth: true,
  changeYear: true,
  dateFormat: "yy-mm-dd"
});

let submitContractButtonEl = $('#submit-contract');
console.log(submitContractButtonEl);

submitContractButtonEl.on('click', addContractToList)

function addContractToList(eventObject){
  eventObject.preventDefault();
  console.log('Button Works');
  let currentContractObject = captureFormSubmitValues();
     console.log(currentContractObject)
      console.log(currentContractObject.projectDueDate.diff())
      console.log(currentContractObject.daysUntilDueDate())
      console.log(currentContractObject.potentialEarnings())

}

class Contract {
  constructor(projectName, projectType, projectHourlyPay, projectDueDate){
    this.projectName = projectName;
    this.projectType = projectType;
    this.projectHourlyPay = projectHourlyPay;
    this.projectDueDate = projectDueDate;
  }

  daysUntilDueDate(){
    let milliseconds = this.projectDueDate.diff();
      // console.log(milliseconds);
      // console.log(millisecondsToDays(milliseconds));
    return millisecondsToDays(milliseconds);
  }

  potentialEarnings(){
    // console.log(`Days left until due date: ${this.daysUntilDueDate()}`);
    // console.log(`Hourly Pay for Project: ${this.projectHourlyPay}`);
    // console.log(`Potential total earnings for Project: ${this.daysUntilDueDate() * this.projectHourlyPay}`);
    return this.daysUntilDueDate() * this.projectHourlyPay
  }
}

function captureFormSubmitValues(){
  let projectName = $('#project-name').val();
  let projectType = $('#project-type').val();
  let projectHourlyPay = parseInt($('#project-hourly-pay').val());
  let projectDueDate = moment($('#due-date-picker').val());
  // let formSubmitValueArray = Array.of(projectName, projectType, projectHourlyPay, projectDueDate);
  let currentContractObject = new Contract(projectName, projectType, projectHourlyPay, projectDueDate);


  console.log(projectDueDate)
  console.log(projectDueDate.toString())
  console.log(typeof projectDueDate)



  return currentContractObject;

  console.log(projectName)
  console.log(typeof projectName)
  console.log(projectType)
  console.log(typeof projectType)
  console.log(projectHourlyPay)

}

function millisecondsToDays(milliseconds) {
  let seconds = milliseconds/1000;
  let minutes = seconds/60;
  let hours = minutes/60;
  let days = hours/24;
return Math.floor(days);
}

// In this project, you will work with others to create a project tracker application using Bootstrap, jQuery, jQueryUI, Moment, and Google Fonts. Break up these phases amongst members of your team.

// Instructions
// This mini-project is divided into four tasks. The first three tasks will get you to MVP, so focus on those first!

// Task 1: HTML Build
// Create a header/hero area that welcomes users to the application and displays the current time and date using Moment.js with setInterval().

// Create a Bootstrap card component explaining the instructions of how to use the app and a button to open a Bootstrap modal dialog.

// The modal should contain a form asking users to fill in the following data:

// The name of the project

// The type of project (use a <select> drop-down)

// The hourly wage for the project

// The due date for the project (use jQuery UI's datepicker with a minimum date setting in place)

// Include a Bootstrap table that the project's information can be printed to with columns for the following data:

// Project name

// Project type

// Hourly wage

// Due date

// Days until the due date (use Moment.js to calculate)

// Estimated total earned (hourly wage at 8 hours per day multiplied by the number of days until the due date)

// While you build, remember the following guidelines:

// Ensure that any elements you need to interact with using JavaScript/jQuery are properly identified (e.g., form elements, the table body, etc.).

// Use different <input> element attributes to help enforce rules, like different type attribute values, minimum values, and required! See the MDN web docs on the HTML input element for more guidance.

// When in doubt, read the Bootstrap documentation.

// Task 2: Capture Form Data
// Using jQuery, set up functionality to capture the form's input elements on submit and use that data to create a new table row on the page.

// Select and save references to every DOM element we will interact with to a variable (i.e., var projectFormEl = $("#project-form");) so that we can use these elements later.

// Attach a submit event listener to the <form> element using jQuery.

// On submission, capture the four input values from the form and pass them to another function to handle printing project data. Having one function that captures the data and another that prints the data to the page's <table> element will improve code readability.

// Task 3: Print Project Data to Page
// Create a function that will accept the four input fields' data as arguments.

// Create a table row (<tr>) element and save it to a variable.

// Create a table detail (<td>) element for each of the table columns created in Task 1.

// For printing the days to the due date, use Moment.js to calculate the difference between the due date and the current time in days.

// For printing the estimated total earned amount, assume that you work an eight-hour day. So multiply the hourly rate by 8 to get the daily rate, then multiply that value by how many days until the project is due to get the estimated total earned.

// Append all <td> elements to the table row created, then append the entire row to the <tbody> element on the page.

// Don't forget to close the modal when done!

// Task 4: Delete a Project From the Table
// Update the table to accommodate one more column without a name.

// When generating a new <tr> for a project, add one more <td> that holds a button for deleting a project from the list.

// Use jQuery event delegation to attach an event listener to each of those buttons so that when clicked, the parent <tr> element will be removed from the page.