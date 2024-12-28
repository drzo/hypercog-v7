import { OpenAI } from 'openai';
import { Logger } from '../logger.service';
import fs from 'fs/promises';
import path from 'path';

export interface SystemMetrics {
    performanceScore: number;
    reliabilityScore: number;
    improvementRate: number;
    lastEvaluationTime?: string;
}

export class EvaluationService {
    private logger: Logger;
    private openai: OpenAI;
    private metricsPath: string;

    constructor() {
        this.logger = new Logger();
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.metricsPath = path.join(process.cwd(), 'data', 'analysis', 'metrics.json');
    }

    async evaluateSystemState(): Promise<{
        status: 'success' | 'failure';
        metrics: SystemMetrics;
        recommendations: string[];
    }> {
        try {
            // Load previous metrics if they exist
            const previousMetrics = await this.loadPreviousMetrics();
            
            // Analyze system logs and performance
            const currentMetrics = await this.calculateCurrentMetrics(previousMetrics);
            
            // Generate recommendations using OpenAI
            const recommendations = await this.generateRecommendations(currentMetrics);
            
            // Save current metrics
            await this.saveMetrics(currentMetrics);
            
            return {
                status: 'success',
                metrics: currentMetrics,
                recommendations
            };
        } catch (error) {
            this.logger.error('Failed to evaluate system state', error);
            return {
                status: 'failure',
                metrics: {
                    performanceScore: 0,
                    reliabilityScore: 0,
                    improvementRate: 0
                },
                recommendations: []
            };
        }
    }

    private async loadPreviousMetrics(): Promise<SystemMetrics | null> {
        try {
            const data = await fs.readFile(this.metricsPath, 'utf-8');
            return JSON.parse(data);
        } catch {
            return null;
        }
    }

    private async calculateCurrentMetrics(previousMetrics: SystemMetrics | null): Promise<SystemMetrics> {
        // TODO: Implement real metrics calculation
        const baseMetrics = {
            performanceScore: previousMetrics?.performanceScore ?? 0.5,
            reliabilityScore: previousMetrics?.reliabilityScore ?? 0.5,
            improvementRate: 0,
            lastEvaluationTime: new Date().toISOString()
        };

        if (previousMetrics?.lastEvaluationTime) {
            const timeDiff = Date.now() - new Date(previousMetrics.lastEvaluationTime).getTime();
            const hoursDiff = timeDiff / (1000 * 60 * 60);
            
            // Calculate improvement rate based on previous metrics
            baseMetrics.improvementRate = hoursDiff > 0 
                ? (baseMetrics.performanceScore - previousMetrics.performanceScore) / hoursDiff
                : 0;
        }

        return baseMetrics;
    }

    private async generateRecommendations(metrics: SystemMetrics): Promise<string[]> {
        const prompt = `Based on the following system metrics:
- Performance Score: ${metrics.performanceScore}
- Reliability Score: ${metrics.reliabilityScore}
- Improvement Rate: ${metrics.improvementRate}

Generate 3 specific recommendations for system improvement. Focus on:
1. Performance optimization
2. Reliability enhancement
3. Learning rate improvement`;

        const completion = await this.openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { 
                    role: "system", 
                    content: "You are an AI system optimization expert. Provide specific, actionable recommendations."
                },
                { 
                    role: "user", 
                    content: prompt 
                }
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        return completion.choices[0].message.content
            .split('\n')
            .filter(line => line.trim().length > 0);
    }

    private async saveMetrics(metrics: SystemMetrics): Promise<void> {
        await fs.mkdir(path.dirname(this.metricsPath), { recursive: true });
        await fs.writeFile(this.metricsPath, JSON.stringify(metrics, null, 2));
    }
} 