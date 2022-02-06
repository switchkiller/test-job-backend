import * as cdk from 'aws-cdk-lib';
import { CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApolloBasedService } from "./apollo-based-graphql-service";


export class PipelineGraphQlApiStage extends cdk.Stage {
    public readonly urlOutput: CfnOutput

    constructor(scope: Construct, id: string, props?: cdk.StageProps) { 
        super(scope, id, props);
    
        const jobService = new ApolloBasedService(this, "JobService", {
            serviceName: "jobs-service"
          });
    
          
    }
}