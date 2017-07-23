export class FirebaseFlatSnapshot {
    public $key?: string;

    constructor(obj?: any) {
        if (obj && obj.$key) {
            this.$key = obj.$key;
        }
    }
}

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