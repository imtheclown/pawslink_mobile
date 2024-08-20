// includes utility function for text-based data modification and processing

// removes underscores and replace it with space

const replaceUnderScoreWithSpace = (input: string) =>{
    return input.replace("_", " ");
} 

const isValidEmail = (text: string|null) => {
    if(text === null){
        return false
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
}

const isAllNumbers = (text :string|null) =>{
    if(text === null){
        return false
    }
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(text);
}

function capitalizeSentence(input: string): string {
    if (!input) return input; // Handle empty string
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

export {replaceUnderScoreWithSpace, isValidEmail, isAllNumbers, capitalizeSentence}