var toDoCount = 0;
var tasks = [];
var toDotasks;



var logic = {

  start: function() {

    //Check if there's something stored in the localStorage memory, and in case it's
    //Pull it and fill the array with that data.

    if (tasks <= 0 && localStorage.getItem("tasks") !== null) {

      //Pull all the data from the key 'tasks' in localStorage and
      //then push it to as indexs in the array tasks.
      tasks = JSON.parse(localStorage.getItem("tasks"));

      //Add all the elementns importes before to the list.
      for (var i = 0; i < tasks.length; i++) {

        //Create a p tag with the value of the index[i] from the array.
        var toDoItem = $("<p>");
        toDoItem.attr("id", "item-" + toDoCount);
        toDoItem.append("" + tasks[i]);

        //Create the button to prepend the p tag
        var toDoClose = $("<button>");
        toDoClose.attr("data-to-do", toDoCount);
        toDoClose.addClass("checkbox");
        toDoClose.append("√");

        //Merge the p tag with the button.
        toDoItem = toDoItem.prepend(toDoClose);

        //Append the button to the div #to-dos
        $("#to-dos").append(toDoItem);

        //Clear the value from the input box.
        $("#to-do").val("");

        //Adds one to the counter, once finished the counter will be ready to add more index's
        toDoCount++;

      }
    }
  },

  pushToArray: function(){

    //Variable to hold the text typed by user.
    toDotasks = $("#to-do").val().trim();

    //Push the text as a new index to the array tasks.
    tasks.push(toDotasks);

    //Increases the counter in 1
    toDoCount++;

    logic.pushToLocalStorage();
    logic.createButton();


  },

  pushToLocalStorage: function(toDoTask) {

    //Pull the full index to the localStorage.
    //Every time this function is run it overwrites the key tasks in localStorage.
    localStorage.setItem("tasks", JSON.stringify(tasks));

    //Calls to logic.createButton


  },

  createButton: function(){

    //Create a p tag
    var toDoItem = $("<p>");
    toDoItem.attr("id", "item-" + toDoCount);
    toDoItem.append("" + toDotasks);

    //Create the button
    var toDoClose = $("<button>");
    toDoClose.attr("data-to-do", toDoCount);
    toDoClose.addClass("checkbox");
    toDoClose.append("√");

    //Merge the p tag and the button
    toDoItem = toDoItem.prepend(toDoClose);

    //Append the button to the div #to-dos
    $("#to-dos").append(toDoItem);

    //Clear the value from the input box.
    $("#to-do").val("");

  },

  delete: function(){

    // Select and Remove the specific <p> element that previously held the to do item number.
    $("#item-" + toDoNumber).remove();

    //Delete item from array


    logic.pushToLocalStorage();
  }

};

//Calling to the function logic.start to update the array and create the buttons
// in case there's something stored in the localStorage.
logic.start();

//  On Click event associated with the add-to-do function
$("#add-to-do").on("click", function(event) {
  event.preventDefault();

  //calls the function logic.Push
  logic.pushToArray();
});

$(document.body).on("click", ".checkbox", function() {
  var toDoNumber = $(this).attr("data-to-do");
  $("#item-" + toDoNumber).remove();
  tasks.splice(toDoNumber,1);
  console.log(toDoNumber, tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
});
