import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AffinityGroup } from '../models';
import { BackendResource } from '../decorators';
import { BaseBackendCachedService } from './base-backend-cached.service';
import { AsyncJobService } from './async-job.service';
import { AffinityGroupType } from '../models/affinity-group.model';


export interface AffinityGroupCreationData {
  name: string;
  type: string;
  description?: string;
}

@Injectable()
@BackendResource({
  entity: 'AffinityGroup',
  entityModel: AffinityGroup
})
export class AffinityGroupService extends BaseBackendCachedService<AffinityGroup> {
  constructor(private asyncJob: AsyncJobService) {
    super();
  }

  public getTypes(params?: {}): Observable<Array<AffinityGroupType>> {
    return this.sendCommand('list;Types', params)
      .map(result => result[`affinityGroupType`] || []);
  }

  public create(params: AffinityGroupCreationData): Observable<AffinityGroup> {
    return super.create(params)
      .switchMap(job => this.asyncJob.queryJob(job.jobid, this.entity, this.entityModel));
  }
}
