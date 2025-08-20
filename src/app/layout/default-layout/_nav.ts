import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'Master',
    },
  },
  {
    name: 'Builders',
    title: true,
  },
  {
    name: 'Module Builder',
    url: '#',
    iconComponent: { name: 'cil-factory' },
    children: [
      {
        name: 'Manage',
        url: 'module/manage',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Hierarchy',
        url: 'module/hierarchy',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Product Builder',
    url: '#',
    iconComponent: { name: 'cil-building' },
    children: [
      {
        name: 'Manage',
        url: '#',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Workflow',
        url: 'workflow',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Rules',
        url: '#',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Template Builder',
    url: '#',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Manage',
        url: '#',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Structure',
        url: 'template-structure',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Condition',
        url: 'template-conditions',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'DEMOS',
    title: true,
  },
  {
    name: 'CDE Auto-Auto1',
    url: '#',
    iconComponent: { name: 'cil-car-alt' },
    children: [
      {
        name: 'Search and Edit',
        url: 'cde-auto-auto1',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Create',
        url: 'cde-auto-auto1/create',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'CDE Vida Tradicional',
    url: '#',
    iconComponent: { name: 'cil-heart' },
    children: [
      {
        name: 'Search and Edit',
        url: 'cde-vida-vidatradicional',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Create',
        url: 'cde-vida-vidatradicional/create',
        icon: 'nav-icon-bullet',
      },
    ],
  },
];
