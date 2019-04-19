import { IOrg } from '@guru-erp/interfaces'
import { Errors } from 'moleculer'
import { OrgsContext } from './orgs'
import orgsEvents from './orgs.events'
// tslint:disable-next-line:import-name
import Org from './orgs.model'

const createOrg = async (ctx: OrgsContext, orgParams: Partial<IOrg>) => {
  ctx.service.logger.trace(`[${ctx.action.name}] Creating new org`, { params: orgParams })

  try {
    const createdOrg = await Org.create(orgParams)

    ctx.service.logger.info(`[${ctx.action.name}] org created successfully`, createdOrg.toJSON())
    ctx.emit(orgsEvents.CREATE_SUCCEEDED, { result: createdOrg, params: orgParams })

    return createdOrg
  } catch (error) {
    if (error.code === 11000) {
      error = new Errors.MoleculerClientError(
        'Duplicated namespace',
        11000,
        'orgs:duplicated_namespace',
        {
          error,
          params: orgParams,
          path: 'namespace',
        },
      )
    }

    ctx.service.logger.error(`[${ctx.action.name}] create org failed`)
    ctx.service.logger.error(error)
    ctx.emit(orgsEvents.CREATE_FAILED, { error, params: orgParams })

    throw error
  }
}

const updateOrgById = async (ctx: OrgsContext, orgId: string, orgUpdates: Partial<IOrg>) => {
  ctx.service.logger.trace(`[${ctx.action.name}] updating org ${orgId}`, orgUpdates)

  return Org.findByIdAndUpdate(orgId, orgUpdates, { new: true })
}

const orgsMethods = {
  createOrg,
  updateOrgById,
}

export default orgsMethods
