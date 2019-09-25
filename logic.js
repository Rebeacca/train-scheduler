var firebaseConfig = {
  apiKey: "AIzaSyCApuMgjSxYY9Gu6Mcz52liav9Hsb2P1Jg",
  authDomain: "train-scheduler-3398c.firebaseapp.com",
  databaseURL: "https://train-scheduler-3398c.firebaseio.com",
  projectId: "train-scheduler-3398c",
  storageBucket: "",
  messagingSenderId: "79189019886",
  appId: "1:79189019886:web:1beeb85e9bc4ee720177ff",
  measurementId: "G-FBF5MFV9TZ"
};
  
firebase.initializeApp(firebaseConfig);
  
  var trainData = firebase.database();
  
  $("#add-train-btn").on("click", function() {
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var frequency = $("#frequency-input").val().trim();
  
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    trainData.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
trainData.ref().on("child_added",function(snapshot){
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes,"m").format("hh:mm A");

  console.log(remainder);
  console.log(minutes);
  console.log(arrival);

  $("#train-table > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})