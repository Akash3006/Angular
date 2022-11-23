import { Photo } from "./photo";

export interface Member{
        id: number;
        photoUrl: string;
        username: string;
        age: number;
        created: string;
        lastActive: string;
        knownAs: string;
        gender: string;
        intrests: string;
        lookingFor: string;
        introduction: string;
        city: string;
        country: string;
        photos: Photo[];    
     
}