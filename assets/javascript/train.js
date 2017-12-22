$(document).ready(function() {


   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAN70lIVeaLLlGONnxdjoz_O0XMjKQJkqM",
    authDomain: "trainhomework-f7b52.firebaseapp.com",
    databaseURL: "https://trainhomework-f7b52.firebaseio.com",
    projectId: "trainhomework-f7b52",
    storageBucket: "trainhomework-f7b52.appspot.com",
    messagingSenderId: "79835948914"
  };

  firebase.initializeApp(config);


  var database = firebase.database();

   
    var name = "" ;
    var destination = "" ;
    var firstTrain = "" ;
    var frequency = 1 ;

    // Capture Button Click
    $("#add-train").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      name = $("#train-name").val().trim();
      destination = $("#destination-input").val().trim();
      console.log("destination: " + destination);
      

      firstTrain = $("#first-train-time").val().trim();
      frequency = $("#frequency-input").val().trim();



      console.log("Name: " + name);
      
      
      // console.log("next train time: " + nextTrainTime);

      // Code for handling the push
      database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,

      });

      $("#train-name").val("");
      $("#destination-input").val("");
      $("#first-train-time").val("");
      $("#frequency-input").val("");

    

    });

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
     database.ref().on("child_added", function(childSnapshot) {

      console.log("frequency: " + childSnapshot.val().frequency);

      var tFrequency = childSnapshot.val().frequency;
      var firstTrainDatabase = childSnapshot.val().firstTrain;

      console.log("firstTrainDatabase: " + firstTrainDatabase);

      var firstTimeConverted = moment(firstTrainDatabase, "hh:mm").subtract(tFrequency, "days");
      console.log(firstTimeConverted);

      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
       var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("MINUTES SINCE ORIGINAL: " + diffTime);

    // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log("MINUTES SINCE LAST: " + tRemainder);

    // Minute Until Train
     var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    nextTrainTime = moment(nextTrain).format("hh:mm");


      $("#current-schedule").append("<tr><td id='name'> " + childSnapshot.val().name +
        " </td><td id='destination'> " + childSnapshot.val().destination +
        " </td><td id='frequency'> " + childSnapshot.val().frequency +
        " </td><td id='nextTrainTime'> " + nextTrainTime + 
        " </td><td>" + tMinutesTillTrain + "</td></tr>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });










})