export function setFavourite(resourceType: string, id: string){
    localStorage.setItem(`favourite_${resourceType}_${id}`, "true");
}

export function isFavourite(resourceType?: string, id?: string): boolean|undefined{
    const result = localStorage.getItem(`favourite_${resourceType}_${id}`);
    if (result === "true") return true;
    return undefined;
}

export function unsetFavourite(resourceType: string, id: string){
    localStorage.removeItem(`favourite_${resourceType}_${id}`);
}