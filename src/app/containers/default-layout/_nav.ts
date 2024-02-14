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
        url: '#'
      },
      {
        name: 'Coinsurances',
        url: '#'
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
        name: 'Siniestro',
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
    name: 'Bulk Processing',
    url: '#',
    iconComponent: { name: 'cil-applications-settings' }
  },
  {
    name: 'Reports',
    url: '#',
    iconComponent: { name: 'cil-applications-settings' }
  },
  {
    name: 'Documents',
    url: '#',
    iconComponent: { name: 'cil-applications-settings' }
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
        url: '#'
      },
      {
        name: 'Condition',
        url: '#'
      },
    ]
  },
];
