import { ISpinnakerGithubConfig } from '../../interfaces/spinnaker-pipeline-github-account.interface'
import buildExpectedArtifacts, { IBuildArtifact } from './helpers/build-expected-artifacts'
import helmValues, { HelmTypes } from './helpers/constants'

type PipelineName = string

interface ISpinnakerTrigger {
  enabled: boolean
  payloadConstraints: object
  source: PipelineName
  type: string
}

interface AppConfig {
  appName: string
  pipelineName: string
  applicationName: string
}

export interface IBaseSpinnakerPipeline {
  appConfig: object
  application: string
  name: PipelineName
  expectedArtifacts: IBuildArtifact[]
  keepWaitingPipelines: boolean
  lastModifiedBy: string
  limitConcurrent: boolean
  stages: any[]
  triggers: ISpinnakerTrigger[]
  updateTs: string
}

const baseSpinnaker = (
  { appName, pipelineName, applicationName }: AppConfig,
  githubConfig: ISpinnakerGithubConfig, githubAccount: string): IBaseSpinnakerPipeline => ({
    appConfig: {},
    application: applicationName,
    name: pipelineName,
    expectedArtifacts: helmValues.map(helmType => buildExpectedArtifacts(githubConfig, githubAccount, appName, helmType as HelmTypes)),
    keepWaitingPipelines: false,
    lastModifiedBy: 'anonymous',
    limitConcurrent: true,
    stages: [],
    triggers: [
      {
        enabled: true,
        payloadConstraints: {},
        source: pipelineName,
        type: 'webhook'
      }
    ],
    updateTs: '1573212638000'
  })

export default baseSpinnaker
