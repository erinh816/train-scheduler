var config = {
  apiKey: "AIzaSyCpBuweNS9ajeH5KRWGB_8scDCbLYcoeyo",
  authDomain: "harry-potter-train-scheduler.firebaseapp.com",
  databaseURL: "https://harry-potter-train-scheduler.firebaseio.com",
  projectId: "harry-potter-train-scheduler",
  storageBucket: "harry-potter-train-scheduler.appspot.com",
  messagingSenderId: "539113917082"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#submit").on("click", function() {

  var train = $("#input-train").val().trim();
  var destination = $("#input-destination").val().trim();
  var firstTime = $("#input-first-train-time").val().trim();
  var frequency = $("#input-frequency").val().trim();

database.ref().push({
  train:train,
  destination:destination,
  firstTime:firstTime,
  frequency:frequency
});

  return false;
});


database.ref().on("child_added", function(snapshot) {
console.log(snapshot.val());

train = snapshot.val().train;
destination = snapshot.val().destination;
firstTime = snapshot.val().firstTime;
frequency = snapshot.val().frequency;


// moment.js methods for time calls and calculations. lines 57 to 65 were accomplished with Tenor's assistance. I didn't update the current time. It looks like "Minutes Away" may be larger than the frequency interval :(
var firstTrainMoment = moment(firstTime, 'HH:mm');
var now = moment(); // creates a moment object of current date and time and storing it in a variable whenever the user click the submit button

var minutesSinceFirstArrival = now.diff(firstTrainMoment, 'minutes');
var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
var minutesAway = frequency - minutesSinceLastArrival;

var nextArrival = now.add(minutesAway, 'minutes');
var formatNextArrival = nextArrival.format("HH:mm");


$("#trains > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + formatNextArrival + "</td><td>" + minutesAway + "</td></tr>");

}, function (errorObject) {

  console.log("The read failed: " + errorObject.code);

});