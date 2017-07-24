import { FirebaseFlatSnapshot } from "./firebase-flat-snapshot";
import { User } from "./user";

export class Photo extends FirebaseFlatSnapshot {
    caption: string;
    imageUrl: string;
    uid: string;

    constructor(obj?: any) {
        super(obj);
        this.caption = obj && obj.caption || '';
        this.imageUrl = obj && obj.imageUrl || '';
        this.uid = obj && obj.uid || '';
    }
}

export class PhotoWithAuthor extends Photo {
    public user: User;

    constructor(obj?: any) {
        super(obj);
        this.user = obj && obj.author || new User();
    }
}
