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
      tFrequency = parseInt(frequency);

      console.log("The frequency here: " + tFrequency);

      var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(tFrequency, "days");
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



      console.log("Name: " + name);
      
      
      console.log("next train time: " + nextTrainTime);

      // Code for handling the push
      database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        nextTrainTime: nextTrainTime,
        tMinutesTillTrain: tMinutesTillTrain
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

      console.log("Name: " + name);
      console.log("destination: " + destination);
      console.log("next Train: " + nextTrainTime);

    });

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
     database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().nextTrainTime);
      console.log(childSnapshot.val().tFrequency);
      // console.log(childSnapshot.val().joinDate);

      // full list of items to the well
      $("#current-schedule").append("<tr><td id='name'> " + childSnapshot.val().name +
        " </td><td id='destination'> " + childSnapshot.val().destination +
        " </td><td id='frequency'> " + childSnapshot.val().frequency +
        " </td><td id='nextTrainTime'> " + childSnapshot.val().nextTrainTime + 
        " </td><td>" + childSnapshot.val().tMinutesTillTrain + "</td></tr>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    // dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    //   // Change the HTML to reflect
    //   $("#name").text(snapshot.val().name);
    //   $("#destination").text(snapshot.val().email);
    //   $("#firstTrain").text(snapshot.val().age);
    //   $("#frequency").text(snapshot.val().comment);
    // });









})