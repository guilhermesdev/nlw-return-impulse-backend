import { prisma } from '@/prisma';
import {
	FeedbackCreateData,
	FeedbacksRepository
} from '@/repositories/FeedbacksRepository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
	async create(data: FeedbackCreateData) {
		await prisma.feedback.create({ data });
	}
}