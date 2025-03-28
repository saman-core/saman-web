import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'HOME'
    }
  },
  {
    name: 'Insurances',
    url: '#',
    iconComponent: { name: 'cilLibraryAdd' },
    children: [
      {
        name: 'Health',
        url: '#'
      },
      {
        name: 'Life',
        url: '#'
      },
      {
        name: 'Business',
        url: '#'
      },
      {
        name: 'Residential',
        url: '#'
      },
      {
        name: 'Transport',
        url: '#'
      },
      {
        name: 'Casualty',
        url: '#'
      },
      {
        name: 'Liability',
        url: '#'
      },
    ]
  },
  {
    name: 'Contracts',
    url: '#',
    iconComponent: { name: 'cilLibraryAdd' },
    children: [
      {
        name: 'Policies',
        url: 'policy'
      },
      {
        name: 'Coinsurances',
        url: 'coinsurance'
      },
      {
        name: 'Reinsurances',
        url: '#'
      },
      {
        name: 'Agreements',
        url: '#'
      },
    ]
  },
  {
    name: 'Parties',
    url: '#',
    iconComponent: { name: 'cilLibraryAdd' },
    children: [
      {
        name: 'Natural',
        url: '#'
      },
      {
        name: 'Legal',
        url: '#'
      },
    ]
  },
  {
    name: 'Actions',
    url: '#',
    iconComponent: { name: 'cilLibraryAdd' },
    children: [
      {
        name: 'Operations',
        url: '#'
      },
      {
        name: 'Claims',
        url: '#'
      },
      {
        name: 'Notifications',
        url: '#'
      },
      {
        name: 'Inspections',
        url: '#'
      },
    ]
  },
  {
    name: 'Accountings',
    url: '#',
    iconComponent: { name: 'cilLibraryAdd' },
    children: [
      {
        name: 'Comissions',
        url: '#'
      },
      {
        name: 'Cash Registers',
        url: '#'
      },
      {
        name: 'Settlements',
        url: '#'
      },
      {
        name: 'Movements',
        url: '#'
      },
      {
        name: 'Collections',
        url: '#'
      },
    ]
  },
  {
    name: 'Security',
    url: '#',
    iconComponent: { name: 'cilLibraryAdd' },
    children: [
      {
        name: 'Audit',
        url: '#'
      },
      {
        name: 'Permissions',
        url: '#'
      },
      {
        name: 'Users',
        url: '#'
      },
    ]
  },
  {
    name: 'Maintenance',
    url: '#',
    iconComponent: { name: 'cilLibraryAdd' },
    children: [
      {
        name: 'Bulk Processing',
        url: '#',
      },
      {
        name: 'Reports',
        url: '#',
      },
      {
        name: 'Documents',
        url: '#',
      },
    ]
  },
  {
    name: 'Builders',
    title: true
  },
  {
    name: 'Product Builder',
    url: '#',
    iconComponent: { name: 'cilLibraryAdd' },
    children: [
      {
        name: 'Structure',
        url: '#'
      },
      {
        name: 'Planes',
        url: '#'
      },
      {
        name: 'Insurance Objects',
        url: '#'
      },
      {
        name: 'Coverage',
        url: '#'
      },
      {
        name: 'Workflow',
        url: 'workflow'
      },
    ]
  },
  {
    name: 'Template Builder',
    url: '#',
    iconComponent: { name: 'cilLibraryAdd' },
    children: [
      {
        name: 'Structure',
        url: 'template-structure/'
      },
      {
        name: 'Condition',
        url: 'template-conditions'
      },
    ]
  },
  {
    name: 'DEMOS',
    title: true
  },
  {
    name: 'CDE Auto-Auto1',
    url: '#',
    iconComponent: { name: 'cilLibraryAdd' },
    children: [
      {
        name: 'Search and Edit',
        url: 'cde-auto-auto1'
      },
      {
        name: 'Create',
        url: 'cde-auto-auto1/create'
      },
    ]
  },
  {
    name: 'CDE Vida Tradicional',
    url: '#',
    iconComponent: { name: 'cilLibraryAdd' },
    children: [
      {
        name: 'Search and Edit',
        url: 'cde-vida-vidatradicional'
      },
      {
        name: 'Create',
        url: 'cde-vida-vidatradicional/create'
      },
    ]
  },
];
