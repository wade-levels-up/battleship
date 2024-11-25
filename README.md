# Battleship

Project Outline:

This is a project I undertook as part of The Odin Project curriculum. The objective of this project was to recreate the classic game of Battleship through a process of Test Driven Development.

Challenges: Creating the computer's logic for choosing attacks was quite challenging and it was a fine balance between making it too hard to beat or too easy to beat. Initially I went down the path of trying to make it think like a player might - If I hit a square that's a ship, then I should look to attack positions around the square, if I hit another position then I should continue to attack in that direction. This worked great for a while but I simplified the process by making it have a chance to specifically attack ships that had already taken two hits (instead of trying to keep track of all past hits and calculate a future hit).

The other part that was challenging was creating the function to place ships and the function to randomly place all ships. It was tricky because it had to look forward and evaluate all the positions a ship would occupy, then if any weren't valid it wouldn't place the ship.

Final Thoughts: TDD was great! It kept my code nice and neat! Things got a little wild once I started putting together the code for event listeners, DOM manipulation and any code relating to the presentation of the game that I wasn't writing tests for, so I found further appreciation for TDD. It'd be cool to come back to this project and implement graphics for the ships and perhaps more commentary on which ships have been destroyed as the game progresses.

Completed 25/11/24
