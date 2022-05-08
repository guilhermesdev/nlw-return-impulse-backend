import { SubmitFeedbackUseCase } from './SubmitFeedbackUseCase';

describe('Submit feedback', () => {
	const createFeedbackSpy = jest.fn();
	const sendMailSpy = jest.fn();

	const submitFeedback = new SubmitFeedbackUseCase(
		{ create: createFeedbackSpy },
		{ sendMail: sendMailSpy }
	);

	it('should be able to submit a feedback without a screenshot', async () => {
		await expect(
			submitFeedback.execute({
				type: 'BUG',
				comment: 'comment'
			})
		).resolves.not.toThrow();

		expect(createFeedbackSpy).toHaveBeenCalled();
		expect(sendMailSpy).toHaveBeenCalled();
	});

	it('should be able to submit a feedback with a valid screenshot format', async () => {
		await expect(
			submitFeedback.execute({
				type: 'BUG',
				comment: 'comment',
				screenshot: 'data:image/png;base64:test.png'
			})
		).resolves.not.toThrow();

		expect(createFeedbackSpy).toHaveBeenCalled();
		expect(sendMailSpy).toHaveBeenCalled();
	});

	it('should not be able to submit a feedback with a invalid screenshot format', async () => {
		await expect(
			submitFeedback.execute({
				type: 'BUG',
				comment: 'comment',
				screenshot: 'image.png'
			})
		).rejects.toThrow();

		expect(createFeedbackSpy).not.toHaveBeenCalled();
		expect(sendMailSpy).not.toHaveBeenCalled();
	});

	it('should not be able to submit a feedback without a type', async () => {
		await expect(
			submitFeedback.execute({
				type: '',
				comment: 'comment'
			})
		).rejects.toThrow();

		expect(createFeedbackSpy).not.toHaveBeenCalled();
		expect(sendMailSpy).not.toHaveBeenCalled();
	});

	it('should not be able to submit a feedback without a comment', async () => {
		await expect(
			submitFeedback.execute({
				type: 'BUG',
				comment: ''
			})
		).rejects.toThrow();

		expect(createFeedbackSpy).not.toHaveBeenCalled();
		expect(sendMailSpy).not.toHaveBeenCalled();
	});
});
