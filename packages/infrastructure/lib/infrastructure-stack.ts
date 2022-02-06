import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApolloBasedService } from './apollo-based-graphql-service';

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const jobService = new ApolloBasedService(this, "JobService", {
      serviceName: "jobs-service"
    });
  }
}
