import { MailAdapter } from '@/adapters/MailAdapter';
import { FeedbacksRepository } from '@/repositories/FeedbacksRepository';

interface SubmitFeedbackUseCaseRequest {
	type: string;
	comment: string;
	screenshot?: string;
}

export class SubmitFeedbackUseCase {
	constructor(
		private feedbacksRepository: FeedbacksRepository,
		private mailAdapter: MailAdapter
	) {}

	async execute({ type, comment, screenshot }: SubmitFeedbackUseCaseRequest) {
		if (!type.trim()) throw new Error('Type is required');

		if (!comment.trim()) throw new Error('Comment is required');

		if (screenshot && !screenshot?.startsWith('data:image/png;base64')) {
			throw new Error('Invalid screenshot format');
		}

		await this.feedbacksRepository.create({
			type,
			comment,
			screenshotscreenshot
		});

		await this.mailAdapter.sendMail({
			subject: `Novo feedback [${type}]`,
			body: [
				'<div style="font-family: sans-serif; font-size: 16px; color: #111">',
				`<p>Tipo do feedback: ${type}</p>`,
				`<p>Comentário: ${comment}</p>`,
				screenshot ? `<img src="${screenshot}" />` : null,
				'</div>'
			].join('\n')
		});
	}
}
