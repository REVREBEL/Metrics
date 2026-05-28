import {
  IconShield,
  IconUsersGroup,
  IconUserPentagon,
  IconUserCog,
} from '@tabler/icons-react'

export const roles = [
  {
    label: 'Superadmin',
    value: 'superadmin',
    icon: IconShield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: IconUserCog,
  },
  {
    label: 'Manager',
    value: 'manager',
    icon: IconUsersGroup,
  },
  {
    label: 'Cashier',
    value: 'cashier',
    icon: IconUserPentagon,
  },
] as const
