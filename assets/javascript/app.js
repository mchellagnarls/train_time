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

    $("#submit").on("click", function(event ) {
        event.preventDefault();

        var input = $("input");
        var trainName = $("#train-name").val().trim();
        var trainDestination = $("#train-destination").val().trim();
        var trainFirstTime = moment($("#first-train-time").val().trim(), "HH:mm");
        var trainFrequency = parseInt($("#train-frequency").valu().trim());
        

    })
});