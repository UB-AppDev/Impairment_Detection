export const StroopGameGen = () =>{

    const colors = ["Red", "Blue", "Green", "Black","Pink", "Purple", "Orange", "Lime", "Magenta", "Teal"];


    // choose 3 colors
    var options: string[] = [];
    
    // choose a color for the word and remove it
    var index = Math.floor(Math.random() * colors.length)
    const color = colors[index].toLowerCase();
    options.push(colors[index]);
    colors.splice(index,1);
    
    // choose a word to be represnted
    index = Math.floor(Math.random() * colors.length)
    const color_word = colors[index];

    // choose 2 more colors and add them to the options
    for (let i = 0; i < 2; i++){
        index = Math.floor(Math.random() * colors.length)
        options.push(colors[index]);
        colors.splice(index,1);
    }

    
    
    return {
        "word":color_word,
        "word_color": color,
        "options": options
    }
}