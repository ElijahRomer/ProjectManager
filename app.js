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
  console.log(`addContractToList FIRED`);
  eventObject.preventDefault();
  let currentContractObject = captureFormSubmitValues();
      // console.log(currentContractObject.daysUntilDueDate())
      // console.log(currentContractObject.potentialEarnings())
  createContractEl(currentContractObject);
};

class Contract {
  constructor(projectName, projectType, projectHourlyPay, projectDueDate){
    this.projectName = projectName;
    this.projectType = projectType;
    this.projectHourlyPay = projectHourlyPay;
    this.projectDueDate = projectDueDate;
    this.daysUntilDue = millisecondsToDays(moment(this.projectDueDate).diff());
    console.log(moment(this.projectDueDate).diff(moment()));
    this.potentialEarnings = `$${this.daysUntilDue * 8 * this.projectHourlyPay}`;
  }
     
  daysUntilDueDate(){
    let milliseconds = this.projectDueDate.diff();
    return millisecondsToDays(milliseconds);
  }

  potentialEarnings(){
    return this.daysUntilDueDate() * this.projectHourlyPay
  }
};

function captureFormSubmitValues(){
  console.log(`CaptureFormSubmitValues FIRED`);
    let projectName = $('#project-name').val();
    let projectType = $('#project-type').val();
    let projectHourlyPay = parseInt($('#project-hourly-pay').val());
    let projectDueDate = moment($('#due-date-picker').val());
    let currentContractObject = new Contract(projectName, projectType, projectHourlyPay, projectDueDate);
    console.log(currentContractObject.projectDueDate)
  return currentContractObject;
};

function millisecondsToDays(milliseconds) {
  console.log(`millisecondsToDays FIRED`);
  console.log(`The milliseconds passed to milliseconds to days is ${milliseconds}.`)
    let seconds = milliseconds/1000;
    let minutes = seconds/60;
    let hours = minutes/60;
    let days = hours/24;
  return Math.floor(days);
};

// let contractEntry = $('<td>');
// console.log(contractEntry);
// contractEntry.html('hello');
// console.log(contractEntry[0]);


function createContractEl(contract){
  console.log(`createContractEl FIRED`);

  let tableBody = $('tbody');
  let contractRow = $('<tr>');
  console.log(contractRow);
  for (let property in contract){
      console.log(`The current property is ${property} and it's value is ${contract[property]}.`);
    let contractEntry = $('<td>');
      console.log(contractEntry);
      if(typeof contract[property] == 'object'){
        contract[property] = contract[property].format('MMMM Do, YYYY');
        console.log(`Date was Formatted to ${contract[property]}`)
      }
    contractEntry.html(contract[property]);
    contractRow.append(contractEntry[0]);
      console.log(contractRow[0]);
  }
  let deleteButton = $(`<td><i class="bi bi-bookmark-x m-1" id="delete-contract"></i></td>`);
  deleteButton.on('click', removeContract);
  contractRow.append(deleteButton)
  tableBody.append(contractRow[0]);
};

function removeContract(eventObject){
  console.log(`delete button click registered`) 
  let contractEntryEl = $(eventObject.target).parent().parent();
  contractEntryEl.remove();
  console.log(contractEntryEl);
}