export const randomizeIcons = () => {
    const availableIcons = [
        "apple-alt", "carrot", "cheese", "drumstick-bite", "fish", "hamburger", "hotdog", "ice-cream", "pizza-slice"
    ];

    let shuffledIcons = [...availableIcons];

    for (let i = shuffledIcons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledIcons[i], shuffledIcons[j]] = [shuffledIcons[j], shuffledIcons[i]];
    }

    return [
        shuffledIcons.slice(0, 3),
        shuffledIcons.slice(3, 6),
        shuffledIcons.slice(6, 9)
    ];
};

export const selectCorrectIcons = (iconsGrid: any) => {
    return [iconsGrid[0][0], iconsGrid[1][1]];
};