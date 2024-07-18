const displayRandom = <T,>(array: T[]): T[] => {

    // create a copy of the array
    const shuffledPost = array.slice();

    for (let i = shuffledPost.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPost[i], shuffledPost[j]] = [shuffledPost[j], shuffledPost[i]];
    }

    return shuffledPost;
  };

  export default displayRandom;