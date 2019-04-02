// cSpell:disable
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import AccountMultiple from 'mdi-material-ui/AccountMultiple'
import ArrangeSendBackward from 'mdi-material-ui/ArrangeSendBackward'
import Bank from 'mdi-material-ui/Bank'
import BarcodeScan from 'mdi-material-ui/BarcodeScan'
import ChartAreaspline from 'mdi-material-ui/ChartAreaspline'
import CreditCardSettings from 'mdi-material-ui/CreditCardSettings'
import FaceAgent from 'mdi-material-ui/FaceAgent'
import Finance from 'mdi-material-ui/Finance'
import FolderAccount from 'mdi-material-ui/FolderAccount'
import HomeVariant from 'mdi-material-ui/HomeVariant'
import Plus from 'mdi-material-ui/Plus'
import Settings from 'mdi-material-ui/Settings'
import Store from 'mdi-material-ui/Store'
import TicketPercent from 'mdi-material-ui/TicketPercent'
import TruckFast from 'mdi-material-ui/TruckFast'
import ViewDashboard from 'mdi-material-ui/ViewDashboard'

export type Service = {
  name: string
  icon?: React.ComponentType<SvgIconProps>
  label?: string
  position?: 'top' | 'bottom'
  children?: Service[]
  apps?: Service[]
}

const services: Service[] = [
  {
    name: 'dashboard',
    icon: ViewDashboard,
    label: 'Org overview',
  },
  {
    name: 'business',
    icon: Store,
    children: [
      {
        name: 'store-1',
        label: 'Công ty Cổ phần Store Làm Mộc',
      },
      {
        name: 'store-2',
        label: 'Xưởng Làm Mộc',
      },
      {
        name: 'store-3',
        label: 'Lube Solution',
      },
    ],
    apps: [
      {
        name: 'analytics',
        icon: ChartAreaspline,
      },
      {
        name: 'orders',
        icon: FolderAccount,
      },
      {
        name: 'inventory',
        icon: ArrangeSendBackward,
      },
      {
        name: 'pos',
        label: 'POS',
        icon: BarcodeScan,
      },
      {
        name: 'delivery',
        icon: TruckFast,
      },
      {
        name: 'payment',
        icon: CreditCardSettings,
      },
      {
        name: 'promotions',
        icon: TicketPercent,
      },
      {
        name: 'customers',
        icon: AccountMultiple,
      },
      {
        name: 'more_apps',
        icon: Plus,
      },
    ],
  },
  {
    name: 'inventory',
    icon: HomeVariant,
  },
  {
    name: 'customer_services',
    icon: FaceAgent,
  },
  {
    name: 'human_resources',
    icon: AccountGroup,
  },
  {
    name: 'marketing',
    icon: Finance,
  },
  {
    name: 'finance',
    icon: Bank,
  },
  {
    name: 'org_settings',
    icon: Settings,
    position: 'bottom',
  },
]

export default services
