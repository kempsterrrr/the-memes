import { ARIO, Wayfinder, PriorityGatewayRouter } from '@ar.io/sdk'
import axios from 'axios'

// initialize ARIO client on mainnet
const ario = ARIO.mainnet()

const priorityRouter = new PriorityGatewayRouter({
    ario,
    sortBy: 'operatorStake',
    sortOrder: 'desc',
    limit: 2,
})

// set up a router that picks a random gateway each time
export const wf = new Wayfinder({
    priorityRouter,
    // @ts-expect-error - axios is not typed
     httpClient: axios
    })

