const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Square, Circle } = require("./lib/shapes");

// Function writes the SVG file using user answers from inquirer prompts
function writeToFile(fileName, answers) {
  let svgString = "";
  svgString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  svgString += "<g>";
  svgString += `${answers.shape}`;
  // Setting shape of logo
  let shapeChoice;
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
  };

  // Setting color of shape
  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  svgString += "</g>";
  svgString += "</svg>";

  // Writing file
  fs.writeFile(fileName, svgString, err => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}

// Function prompts user for input using inquirer
function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "Select the three letters for your logo",
        name: "text"
      },
      {
        type: "input",
        message:
          "Select color for text or a hex number",
        name: "textColor"
      },
      {
        type: "list",
        message: "What shape would you like the logo to be?",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape"
      },
      {
        type: "input",
        message:
          "Select color for the shape or a hex number",
        name: "shapeBackgroundColor"
      }
    ])
    .then(answers => {
      if (answers.text.length > 3) {
        console.log("3 letters only please");
        promptUser();
      } else {
        // Calling write file function to generate SVG file
        writeToFile("logo.svg", answers);
      }
    });
}

// Calling promptUser function so inquirer prompts user for input
promptUser();
