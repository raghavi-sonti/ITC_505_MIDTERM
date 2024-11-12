// Story stages for the Harry Potter-themed adventure game
const storyStages = {
    start: {
        text: "Welcome to Hogwarts! You've just received your letter to join the wizarding world. Do you want to be sorted into Gryffindor or Slytherin?",
        choices: [
            { text: "Gryffindor", consequence: "gryffindor" },
            { text: "Slytherin", consequence: "slytherin" }
        ],
        image: "hogwarts_image.png"
    },
    gryffindor: {
        text: "You are sorted into Gryffindor! Your first task is to defeat a magical creature. Will you fight it or try to escape?",
        choices: [
            { text: "Fight it", consequence: "fight" },
            { text: "Escape", consequence: "escape" }
        ],
        image: "gryffindor_image.png"
    },
    slytherin: {
        text: "You are sorted into Slytherin! Your first task is to steal a powerful artifact from the Headmaster’s office. Will you try to sneak in or use magic?",
        choices: [
            { text: "Sneak in", consequence: "sneak" },
            { text: "Use magic", consequence: "useMagic" }
        ],
        image: "slytherin_image.png"
    },
    fight: {
        text: "You bravely fight the magical creature and emerge victorious! You’re celebrated as a hero!",
        choices: [],
        image: "victory_image.png"
    },
    escape: {
        text: "You wisely choose to escape and live to fight another day. Your adventure ends for now.",
        choices: [],
        image: "escape_image.png"
    },
    sneak: {
        text: "You successfully sneak past the guards and steal the artifact! However, you're caught by the Headmaster and punished.",
        choices: [],
        image: "caught_image.png"
    },
    useMagic: {
        text: "You try to use magic to teleport to the artifact, but it backfires! You are caught and expelled from Hogwarts.",
        choices: [],
        image: "expelled_image.png"
    }
};

let currentStage = 'start';

// Function to initialize the game
function startGame() {
    currentStage = 'start';
    updatePage();
    document.getElementById('endGameMessage').classList.add('hidden');  // Hide end game message
    document.getElementById('choices').classList.remove('hidden');      // Show choices section
}

// Function to update the content based on the current stage
function updatePage() {
    const stage = storyStages[currentStage];
    const storyDiv = document.getElementById('story');
    const choicesDiv = document.getElementById('choices');
    const endGameMessageDiv = document.getElementById('endGameMessage');
    const lastModifiedDiv = document.getElementById('lastModified');
    
    // Update story text and image
    storyDiv.innerHTML = `<p>${stage.text}</p>`;
    if (stage.image) {
        storyDiv.innerHTML += `<img id="storyImage" src="${stage.image}" alt="Story image">`;
    }

    // Update choices (if any)
    choicesDiv.innerHTML = '';
    if (stage.choices.length > 0) {
        stage.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choiceButton';
            button.textContent = choice.text;
            button.onclick = function() {
                currentStage = choice.consequence;
                updatePage();
            };
            choicesDiv.appendChild(button);
        });
    } else {
        // If there are no more choices, show the end game message
        endGameMessageDiv.classList.remove('hidden');
        choicesDiv.classList.add('hidden');
    }

    // Update last modified date
    lastModifiedDiv.textContent = `Last Modified: ${document.lastModified}`;
}

// Wait for the document to load before starting the game
document.addEventListener('DOMContentLoaded', startGame);

// Restart the game when the restart button is clicked
document.getElementById('restartButton')?.addEventListener('click', startGame);
