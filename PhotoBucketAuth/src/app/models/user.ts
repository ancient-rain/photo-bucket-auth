import { FirebaseFlatSnapshot } from "./firebase-flat-snapshot";

export class User extends FirebaseFlatSnapshot {
    public userUid: string;

    constructor(obj?: any) {
        super(obj);
        this.userUid = obj && obj.userUid || '';
    }
}
