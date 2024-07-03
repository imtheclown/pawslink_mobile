// includes utility function for text-based data modification and processing

// removes underscores and replace it with space

const replaceUnderScoreWithSpace = (input: string) =>{
    return input.replace("_", " ");
} 

export {replaceUnderScoreWithSpace}