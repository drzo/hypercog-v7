import { Octokit } from '@octokit/rest';
import { loggerService } from '../../logger.service';
export async function setupGitHubRepo(env) {
    const octokit = new Octokit({ auth: env.GIT_HUB_API_KEY });
    const repoUrl = new URL(env.GIT_HUB_REPO_URL);
    const [owner, repo] = repoUrl.pathname.slice(1).split('/');
    try {
        // Create data directories via GitHub API
        await Promise.all([
            createDirectory(octokit, owner, repo, 'data/cycles/1'),
            createDirectory(octokit, owner, repo, 'data/cycles/2'),
            createDirectory(octokit, owner, repo, 'data/analysis'),
            createDirectory(octokit, owner, repo, 'logs')
        ]);
        // Create GitHub Actions workflows
        await Promise.all([
            createWorkflow(octokit, owner, repo, 'improvement-cycle-1.yml', getWorkflowContent(1)),
            createWorkflow(octokit, owner, repo, 'improvement-cycle-2.yml', getWorkflowContent(2)),
            createWorkflow(octokit, owner, repo, 'analyze-cycles.yml', getAnalysisWorkflowContent())
        ]);
        loggerService.info('GitHub repository set up successfully');
    }
    catch (error) {
        loggerService.error('Failed to set up GitHub repository', error);
        throw error;
    }
}
async function createDirectory(octokit, owner, repo, path) {
    try {
        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: `${path}/.gitkeep`,
            message: `Create ${path} directory`,
            content: Buffer.from('').toString('base64')
        });
    }
    catch (error) {
        if (error.status !== 422) { // Ignore if file already exists
            throw error;
        }
    }
}
async function createWorkflow(octokit, owner, repo, filename, content) {
    try {
        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: `.github/workflows/${filename}`,
            message: `Create ${filename} workflow`,
            content: Buffer.from(content).toString('base64')
        });
    }
    catch (error) {
        if (error.status !== 422) { // Ignore if file already exists
            throw error;
        }
    }
}
function getWorkflowContent(cycleNumber) {
    return `name: HyperCog Improvement Cycle ${cycleNumber}

on:
  schedule:
    - cron: '*/5 * * * *'  # Run every 5 minutes
  workflow_dispatch:  # Allow manual triggers

jobs:
  improve:
    runs-on: ubuntu-latest
    env:
      GIT_HUB_API_KEY: \${{ secrets.GIT_HUB_API_KEY }}
      GIT_HUB_REPO_URL: \${{ secrets.GIT_HUB_REPO_URL }}
      TRIGGER_DEV: \${{ secrets.TRIGGER_DEV }}
      TRIGGER_PAT: \${{ secrets.TRIGGER_PAT }}
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run improvement cycle${cycleNumber === 2 ? ' with alternative strategy' : ''}
        run: |${cycleNumber === 2 ? '\n          export IMPROVEMENT_STRATEGY=alternative' : ''}
          node dist/index.js
        
      - name: Save cycle results
        run: |
          mkdir -p data/cycles/${cycleNumber}
          cp logs/*.json data/cycles/${cycleNumber}/
          git config --global user.name 'HyperCog'
          git config --global user.email 'bot@hypercog.ai'
          git add data/cycles/${cycleNumber}
          git commit -m "Improvement cycle ${cycleNumber} results [skip ci]"
          git push`;
}
function getAnalysisWorkflowContent() {
    return `name: Analyze Improvement Cycles

on:
  schedule:
    - cron: '0 * * * *'  # Run hourly
  workflow_dispatch:

jobs:
  analyze:
    runs-on: ubuntu-latest
    env:
      GIT_HUB_API_KEY: \${{ secrets.GIT_HUB_API_KEY }}
      GIT_HUB_REPO_URL: \${{ secrets.GIT_HUB_REPO_URL }}
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Analyze cycle results
        run: |
          node -e "
            const { createCycleAnalyzer } = require('./dist/services/trigger/jobs/improvement/analyzer');
            const analyzer = createCycleAnalyzer();
            
            // Load and analyze results from both cycles
            const analysis = await analyzer.analyzeCycleResults();
            
            // Save analysis results
            const fs = require('fs');
            const timestamp = new Date().toISOString();
            const analysisPath = \`data/analysis/\${timestamp}.json\`;
            
            fs.mkdirSync('data/analysis', { recursive: true });
            fs.writeFileSync(analysisPath, JSON.stringify(analysis, null, 2));
            
            // Commit analysis results
            const exec = require('child_process').execSync;
            exec('git config --global user.name \\"HyperCog\\"');
            exec('git config --global user.email \\"bot@hypercog.ai\\"');
            exec(\`git add \${analysisPath}\`);
            exec('git commit -m \\"Add cycle analysis results [skip ci]\\"');
            exec('git push');
          "`;
}
