export interface SendMailData {
	subject: string;
	body: string;
	from?: string;
	to?: string;
}

export interface MailAdapter {
	sendMail: (data: SendMailData) => Promise<void>;
}
