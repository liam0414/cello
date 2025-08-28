import { Music, Users, Calendar, Camera, BookOpen, Mail, Lock } from 'lucide-react';

export interface NavigationItem {
  href?: string;
  label: string;
  icon?: any;
  protected?: boolean;
  submenu?: NavigationItem[];
}

export const navigation: NavigationItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: Music
  },
  {
    label: 'Lessons & Events',
    icon: Users,
    submenu: [
      {
        href: '/events',
        label: 'Events'
      },
      {
        href: '/lessons/group-lessons',
        label: 'Group Lessons'
      },
      {
        href: '/events/residential-camp',
        label: '2026 Jan Residential Camp'
      },
      {
        href: '/events/takaos-talk',
        label: "Takao's Talk"
      },
      {
        href: '/lessons/extra-lessons',
        label: 'Extra Lessons'
      },
      {
        href: '/resources/suzuki-big-kids',
        label: 'SuzukiCello for Big Kids'
      }
    ]
  },
  {
    label: 'Performances',
    icon: Calendar,
    submenu: [
      {
        href: '/events/concerts',
        label: 'Concerts'
      },
      {
        href: '/events/takaos-talk',
        label: "Takao's Talk"
      }
    ]
  },
  {
    label: 'Media & Resources',
    icon: Camera,
    submenu: [
      {
        href: '/media/video-clips',
        label: 'Video Clips'
      },
      {
        href: '/media/studio-media',
        label: 'Studio Video Photo Clips'
      },
      {
        href: '/media/photos',
        label: 'Photos',
        protected: true
      },
      {
        href: '/media/videos',
        label: 'Videos',
        protected: true
      }
    ]
  },
  {
    label: 'Learning Resources',
    icon: BookOpen,
    submenu: [
      {
        href: '/resources/cello-info',
        label: 'Cello Info'
      },
      {
        href: '/resources/practice-help',
        label: 'Practice Help',
        protected: true
      }
    ]
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: Mail
  }
];

// Helper function to get all navigation items (including submenu items)
export const getAllNavigationItems = (): NavigationItem[] => {
  const allItems: NavigationItem[] = [];
  
  navigation.forEach(item => {
    if (item.href) {
      allItems.push(item);
    }
    if (item.submenu) {
      allItems.push(...item.submenu);
    }
  });
  
  return allItems;
};

// Helper function to find navigation item by href
export const findNavigationItem = (href: string): NavigationItem | undefined => {
  return getAllNavigationItems().find(item => item.href === href);
};