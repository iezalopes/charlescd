import { EntityRepository, Repository } from 'typeorm'
import { QueuedDeploymentEntity } from '../entity'
import { QueuedDeploymentStatusEnum } from '../enums'

@EntityRepository(QueuedDeploymentEntity)
export class QueuedDeploymentsRepository extends Repository<QueuedDeploymentEntity> {

  public async getAllByComponentIdAscending(componentId: string): Promise<QueuedDeploymentEntity[]> {
    return this.createQueryBuilder('queued_deployment')
      .where('queued_deployment.component_id = :componentId', { componentId })
      .orderBy('queued_deployment.id', 'ASC')
      .getMany()
  }

  public async getOneByComponentIdRunning(componentId: string): Promise<QueuedDeploymentEntity> {
    return this.createQueryBuilder('queued_deployment')
      .where(
        'queued_deployment.component_id = :componentId AND queued_deployment.status = :status',
        { componentId, status: QueuedDeploymentStatusEnum.RUNNING })
      .orderBy('queued_deployment.id', 'ASC')
      .getOne()
  }
}
