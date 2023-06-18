'use-strict';

let registerModal = document.getElementById('register-modal');
let registerModal_X_Button = document.getElementById('modal2-x-button');
let registerbtn = document.getElementById('register-btn');
let registerInputName = document.getElementById('register_name');
let registerInputId = document.getElementById('register_id');
let ison = true;
//first we have to open the modal when user click register button
let register_btn_nav = document.getElementById('navbar-register-btn');

//this open the register modal
register_btn_nav.addEventListener('click', function () {
  registerModal.showModal();
});

//this happens as soon as we hit register button
registerbtn.addEventListener('click', function (event) {
  event.preventDefault();

  var idexist = false;
  let userkey = registerInputName.value; //create unique key for each user
  userkey = userkey.substring(0, userkey.indexOf(' '));
  userkey = 'user_' + userkey;
  console.log(userkey);

  for (let i = 0; i < localStorage.length; i++) {
    let keys = localStorage.key(i);
    var userData = JSON.parse(localStorage.getItem(keys));
    let input_id = Number(registerInputId.value);

    if (Number(userData.Id) != input_id) {
      idexist = false;
      document.getElementById('registration-error-msg').classList.add('hidden');
      //   alert(idexist);
    } else {
      idexist = true;
      document
        .getElementById('registration-error-msg')
        .classList.remove('hidden');
      console.log('ID Exist........');
      break;
    }
  }

  if (
    idexist === false &&
    registerInputId.value !== '' &&
    registerInputName.value !== ''
  ) {
    var users = {
      userName: registerInputName.value,
      Id: registerInputId.value,
    };
    localStorage.setItem(userkey, JSON.stringify(users));
    registerInputId.value = '';
    registerInputName.value = '';
    alert('User successfully registerd');
  }
});

let closr_register_modal = document.getElementById('modal2-x-button');
closr_register_modal.addEventListener('click', function () {
  registerModal.close();
});

//this is to display registerd user

//display modal close and open
let display_modal = document.getElementById('modal-display-users');
let display_users_table = document.getElementById('table-display-users');
let show_registerd_users = document.getElementById('navbar-show-btn');

show_registerd_users.addEventListener('click', function () {
  display_users_table.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    //creating column
    let row = document.createElement('tr');
    //creating column to display users registerd
    let col1 = document.createElement('td');
    let col2 = document.createElement('td');

    col1.style.textTransform = 'uppercase';
    let keys = localStorage.key(i);
    var userData = JSON.parse(localStorage.getItem(keys));

    col1.innerHTML = userData.userName;
    col2.innerHTML = userData.Id;
    //append the columns in to our row

    col1.innerHTML = `${i + 1 + ','} ` + userData.userName;
    col2.innerHTML = userData.Id;
    //append the columns into our row
    row.appendChild(col1);
    row.appendChild(col2);

    display_users_table.appendChild(row);
  }
  display_modal.showModal();
});

let close_display_modal = document.getElementById('display-modal-close');
//when we click close button inside display users modal
close_display_modal.addEventListener('click', function () {
  display_modal.close();
});

//show winner message modal dialog
let modal_winner = document.getElementById('modal-winner');
let show_winner_btn = document.getElementById('btn-winner');
let close_winner_modal_x = document.getElementById('modal-x-button');
let close_winner_modal = document.getElementById('btn-m');

show_winner_btn.addEventListener('click', function () {
  if (persons_list_payed[0] !== undefined && ison === true) {
    ison = false;

    let rand = Math.floor(Math.random() * PayedAmounts.length);

   
    document.getElementById('winner-name').innerHTML = persons_list_payed[rand];
    document.getElementById('win-amount').innerHTML = '$'+Number(PayedAmounts[0]) * PayedAmounts.length;
    modal_winner.showModal();
  } else {
    alert('no one wins');
  }
});

close_winner_modal_x.addEventListener('click', function () {
  modal_winner.close();
});

close_winner_modal.addEventListener('click', function () {
  modal_winner.close();
});

//first i will load the datafrom localhost toarray
let userNameArray = [];
let usersIdArray = [];
function dataLoaderFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let keys = localStorage.key(i);
    var userData = JSON.parse(localStorage.getItem(keys));
    userNameArray[i] = userData.userName;
    usersIdArray[i] = userData.Id;
  }
}

//list of persons who payed

//show who pay
let table_shows_who_pay = document.getElementById('table-data');
let add_users_to_table_form = document.getElementById('form');
let pay_by_id = document.getElementById('pay-Id');
//toget a value from drop down
let person_payed = 0;

var persons_list_payed = [];
var persons_list_payed_id = [];
var PayedAmounts = [];

add_users_to_table_form.addEventListener('submit', function (event) {
  event.preventDefault();
  dataLoaderFromLocalStorage();
  // console.log(userNameArray)
  // console.log(usersIdArray);
  var isPayed = false;

  let amount_payed_by_user = document.getElementById('amount');
  let selected_Amount = amount_payed_by_user.value;
  let payment_error_message = document.getElementById('payment-error-msg');
  let payment_success_message = document.getElementById('payment-success-msg');
  let current = usersIdArray.indexOf(pay_by_id.value);
  //there is no message when we run it first
  payment_error_message.innerHTML = '';
  payment_success_message.innerHTML = '';

  //isPayed = persons_list_payed_id.indexOf(pay_by_id.value) == -1 ? false : true;
  let p = pay_by_id.value;
  isPayed = persons_list_payed_id.includes(p);
  //alert(isPayed);
  // alert(persons_list_payed_id.indexOf(pay_by_id.value));
  //console.log(current);

  if (pay_by_id.value !== '' && current !== -1 && !isPayed) {
    PayedAmounts[person_payed] = selected_Amount;
    persons_list_payed_id[person_payed] = usersIdArray[current];
    persons_list_payed[person_payed] = userNameArray[current];
    console.log(PayedAmounts);
    let row = document.createElement('tr');
    //creating column to display users registerd
    let col1 = document.createElement('td');
    let col2 = document.createElement('td');
    row.style.color = 'black';
    col1.innerHTML = userNameArray[current];
    col2.innerHTML = PayedAmounts[person_payed];

    row.appendChild(col1);
    row.appendChild(col2);

    table_shows_who_pay.appendChild(row);

    //log persons who payed
    console.log(persons_list_payed_id);
    payment_success_message.innerHTML =
      'Payment Successful! We wish you the best of luck!';
    person_payed++;
  }
  //if user has not enterd an id
  else if (pay_by_id.value === '') {
    payment_error_message.innerHTML =
      'Payment Error: ID Required. Please provide a valid ID before proceeding with the payment.';
    // alert('please fill the necessary information before you pay!');
  }
  //if user id not found
  else if (current === -1) {
    payment_error_message.innerHTML =
      'Payment Error: ID Not Found. Please verify your ID and try again.';
    // alert('there is no user by that id');
  }
  //if user has already pay
  else if (isPayed) {
    payment_error_message.innerHTML =
      'You have already successfully completed a payment. If you believe there has been an error or need further assistance, please contact our support team.';
  }
});
