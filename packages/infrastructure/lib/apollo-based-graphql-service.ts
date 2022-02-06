import { Construct } from "constructs";
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as core from 'aws-cdk-lib';
import { Tracing } from "aws-cdk-lib/aws-lambda";
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { join } from 'path';

export interface ApolloBasedServiceProps {
    readonly serviceName: string;
}

export class ApolloBasedService extends Construct {
    readonly graphQLApiEndpoint: string;

    constructor(scope: Construct, id: string, props: ApolloBasedServiceProps) { 
        super(scope, id);

        // Define the lambda that will run the graphql service
        const apolloServer = new lambda.NodejsFunction(this, 'ApolloServer', {
            entry: join(__dirname, `${props.serviceName}.ts`),
            timeout: core.Duration.seconds(30),
            tracing: Tracing.ACTIVE,
        })

        const graphqlApi = new apigateway.RestApi(this, `Api`, {
            restApiName: `${props.serviceName} graphql endpoint`,
            description: `This service serves ${props.serviceName} data through apollo graphql`,
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS,
            },
            deployOptions: {
                tracingEnabled: true,
            },
        });

        const graphqlPostIntegration = new apigateway.LambdaIntegration(apolloServer);

        graphqlApi.root.addMethod('POST', graphqlPostIntegration);

        this.graphQLApiEndpoint = graphqlApi.url;
    }
}