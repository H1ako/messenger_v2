export function getArrayWithoutElement(array, elementToRemove) {
    const arrayCopy = [...array]
    const elementIndex = arrayCopy.indexOf(elementToRemove);

    if (elementIndex === -1) return
    
    arrayCopy.splice(elementIndex, 1);
    return arrayCopy
}