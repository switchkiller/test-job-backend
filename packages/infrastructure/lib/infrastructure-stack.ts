import { Stack, StackProps } from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineGraphQlApiStage } from './pipeline-stage';

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: "IdeathonPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub('switchkiller/test-job-backend', 'master'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    })

    const UAT = pipeline.addStage(new PipelineGraphQlApiStage(this, "Test"));

  }
}
