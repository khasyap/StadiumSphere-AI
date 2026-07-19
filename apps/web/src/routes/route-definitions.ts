export interface ApplicationPage {
  description: string;
  icon: string;
  label: string;
  path: string;
}

export const routePaths = {
  application: {
    activity: '/activity',
    aiAssistant: '/ai-assistant',
    analytics: '/analytics',
    bookings: '/bookings',
    dashboard: '/',
    events: '/events',
    help: '/help',
    organizations: '/organizations',
    settings: '/settings',
    sports: '/sports',
    stadiums: '/stadiums',
    teams: '/teams',
    venues: '/venues',
  },
  public: {
    about: '/about',
  },
} as const;

export const applicationPages: readonly ApplicationPage[] = [
  { description: 'A real-time overview of your global stadium operations.', icon: '◈', label: 'Dashboard', path: routePaths.application.dashboard },
  { description: 'Coordinate the organizations powering every matchday.', icon: '◎', label: 'Organizations', path: routePaths.application.organizations },
  { description: 'Operate world-class stadium infrastructure with confidence.', icon: '◇', label: 'Stadiums', path: routePaths.application.stadiums },
  { description: 'Manage venue readiness, reservations, and operations.', icon: '⌘', label: 'Venues', path: routePaths.application.venues },
  { description: 'Configure the sports that shape your competition landscape.', icon: '◌', label: 'Sports', path: routePaths.application.sports },
  { description: 'Keep team operations aligned across every competition.', icon: '◉', label: 'Teams', path: routePaths.application.teams },
  { description: 'Plan and oversee every event from schedule to final whistle.', icon: '✦', label: 'Events', path: routePaths.application.events },
  { description: 'Track the booking lifecycle with operational clarity.', icon: '▣', label: 'Bookings', path: routePaths.application.bookings },
  { description: 'Explore intelligence-ready operational signals.', icon: '↗', label: 'Analytics', path: routePaths.application.analytics },
  { description: 'Review a unified stream of platform decisions.', icon: '◫', label: 'Activity', path: routePaths.application.activity },
  { description: 'Prepare your operations team for assisted decision-making.', icon: '✺', label: 'AI Assistant', path: routePaths.application.aiAssistant },
  { description: 'Tailor the StadiumSphere workspace to your operation.', icon: '⚙', label: 'Settings', path: routePaths.application.settings },
  { description: 'Find platform guidance and operational resources.', icon: '?', label: 'Help', path: routePaths.application.help },
  { description: 'Learn about the StadiumSphere AI operations platform.', icon: 'i', label: 'About', path: routePaths.public.about },
];

export function getPage(pathname: string): ApplicationPage {
  return applicationPages.find((page) => page.path === pathname) ?? applicationPages[0]!;
}
