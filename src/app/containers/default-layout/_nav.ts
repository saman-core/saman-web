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
    name: 'Builders',
    title: true
  },
  {
    name: 'Product Builder',
    url: '#',
    iconComponent: { name: 'cilLibraryAdd' },
    children: [
      {
        name: 'Contracts hierarchy',
        url: '#'
      },
      {
        name: 'Parties hierarchy',
        url: '#'
      },
      {
        name: 'Stocks hierarchy',
        url: '#'
      },
      {
        name: 'Workflow',
        url: 'workflow'
      },
      {
        name: 'Resources',
        url: '#'
      },
      {
        name: 'System-Tables',
        url: '#'
      },
      {
        name: 'Rules',
        url: '#'
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
  {
    name: 'Contracts',
    url: '#',
    iconComponent: { name: 'cilLibraryAdd' },
    children: [
      {
        name: 'Policies',
        url: 'policy'
      },
    ]
  },
];
