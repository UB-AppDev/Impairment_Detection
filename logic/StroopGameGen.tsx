export const StroopGameGen = () =>{

    const colors = ["Red", "Blue", "Green"];
    
    // choose a color for the word and remove it
    var index = Math.floor(Math.random() * colors.length)
    const color = colors[index];
    colors.splice(index,1);
    
    // choose a word to be represnted
    index = Math.floor(Math.random() * colors.length)
    const color_word = colors[index];

    // choose 3 colors
    const options = [];
    for (let i = 0; i < 3; i++){
        index = Math.floor(Math.random() * colors.length)
        options.push(colors[index])
        colors.splice(index,1);
    }
    
    return {
        "word":color_word,
        "word_color": color,
        "options": options
    }
}