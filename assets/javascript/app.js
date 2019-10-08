$(document).ready(function() {
    // Your web app's Firebase configuration //
    var config = {
        apiKey: "AIzaSyDLuL-vi5FDPZ6X0lP2TWnxuMoLUqPOMw4",
        authDomain: "train-time-33742.firebaseapp.com",
        databaseURL: "https://train-time-33742.firebaseio.com",
        projectId: "train-time-33742",
        storageBucket: "",
        messagingSenderId: "471016012544",
        appId: "1:471016012544:web:360eab29f38ceb58e9d1e5"
    };
    // Initialize Firebase //
    firebase.initializeApp(config);

    // Set database variable to firebase database //
    var database = firebase.database();

    // Primary function acting on the user's click //
    $("#submit").on("click", function(event) {
        // Prevents click from submitting form too quickly //
        event.preventDefault();

        // Initial variables //
        var input = $("input");
        var trainName = $("#train-name").val().trim();
        var trainDestination = $("#train-destination").val().trim();
        var trainFirstTime = moment($("#first-train-time").val().trim(), "HH:mm");
        var trainFrequency = parseInt($("#train-frequency").val().trim());

        if (trainName.length === 0) {
            trainName = "";
            $("#train-name").val("");
            $("#train-name").attr("class", "form-control is invalid");
            $("#invalid-name").text("Please enter a train name")
        }
        else {
            $("#train-name").attr("class", "form-control");
            $("#invalid-name").text("");
        }

        if (trainDestination.length === 0) {
            trainDestination = "";
            $("#train-destination").val("");
            $("#train-destination").attr("class", "form control is invalid");
            $("#invalid-destination").text("Please enter a destination");
        }

        else {
            $("#train-destination").attr("class", "form-control");
            $("#invalid-destination").text("");
        }

        if (Number.isInteger(trainFrequency) === false) {
            $("#train-frequency").val("");
            $("#train-frequency").attr("class", "form control is invalid");
            $("#invalid-frequency").text("Please enter a valid frequency");
        }

        else {
            $("#train-frequency").attr("class", "form-control");
            $("#invalid-frequency").text("");
        }

        if (moment(trainFirstTime).isValid() === false) {
            trainFirstTime = "";
            $("#first-train-time").val("");
            $("#first-train-time").attr("class", "form control is invalid");
            $("#invalid-time").text("Please enter a valid time");
            
            return
        }

        $("#first-train-time").attr("class", "form-control");
        $("#invalid-time").text("");

            var newTrain = {
                name: trainName,
                destination: trainDestination,
                firstTime: trainFirstTime.format("HH:mm"),
                frequency: trainFrequency
            };

            $("#first-train-time").attr("class", "form-group");

            $("#helpBlock").text("");

            database.ref().push(newTrain);

            console.log(newTrain.name);
            console.log(newTrain.destination);
            console.log(newTrain.firstTime);
            console.log(newTrain.frequency);

            $("#train-name").val("");
            $("#train-destination").val("");
            $("#first-train-time").val("");
            $("#train-frequency").val("");
        });

        // Pushing data to Firebase //
        database.ref().on("child_added", function(childSnapshot) {

            var trainName = (childSnapshot.val().name);
            var trainDestination = (childSnapshot.val().destination);
            var trainFirstTime = (childSnapshot.val().firstTime);
            var trainFrequency = (childSnapshot.val().frequency);

            var convertedTime = moment(trainFirstTime, "HH:mm").subtract(1, "years");
            console.log(convertedTime);

            // Variable for current time //
            var currentTime = moment();

            // Variable for for difference between time //
            var timeDifference = moment().diff(moment(convertedTime), "minutes");
            console.log("Difference in time: " + timeDifference);

            // Time apart //
            var timeRemainder = timeDifference % trainFrequency;
            console.log(timeRemainder);

            // Minutes away //
            var minutesAway = trainFrequency - timeRemainder;
            console.log("Minutes until next train: " + minutesAway);

            // Minutes until next train arrives //
            var nextArrival = moment().add(minutesAway, "minutes");
            console.log("Arrival time: " + moment(nextArrival).format("HH:mm"));

            // Creating new row in HTML table //
            var newRow = $("<tr>").append (
                $("<td>").text(trainName),
                $("<td>").text(trainDestination),
                $("<td>").text(trainFrequency),
                $("<td>").text(nextArrival.format("HH:mm")),
                $("<td>").text(minutesAway)
            );
            
            // Append the newly created row to the HTML table //
            $("#train-info").append(newRow);
        })

})
