export class ObjectProperties {
    public name: string;
    public value: any;
}

export class InvalidEmail {
    public created;
    public email;
    public reason;
}

export class BouncedEmails extends InvalidEmail {
    public status;
}

export class SendEmail {
    public to: string;
    public subject: string;
    public textContent: string;
    public htmlContent: string;
}
