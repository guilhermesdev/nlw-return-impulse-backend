import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from '@/adapters/MailAdapter';

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({ subject, body, from, to }: SendMailData) {
		const transport = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			}
		});

		await transport.sendMail({
			from: from || process.env.FEEDBACK_EMAIL_FROM,
			to: to || process.env.FEEDBACK_EMAIL_TO,
			subject,
			html: body
		});
	}
}
