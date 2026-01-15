import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Briefcase,
  Home,
  User,
  User2,
  ChevronUp,
  CheckLine,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../auth/mutations';
import { useRouter } from 'next/navigation';

const items = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Workspace',
    url: '/dashboard/workspace',
    icon: Briefcase,
  },
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: User,
  },
  {
    title: 'Approvals',
    url: '/dashboard/approvals',
    icon: CheckLine,
  },
  {
    title: 'Booking',
    url: '/dashboard/bookings',
    icon: Briefcase,
  },
];

const filteredItems = items.filter(
  (ele) => ele.title !== 'Users' && ele.title !== 'Approvals'
);

function AdminSidebar() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { mutate: logout, isPending, error } = useLogout();

  let itemsFix = items;

  if (user?.role === 'PROVIDER') {
    itemsFix = filteredItems;
  } else itemsFix = items;

  let title = 'Dashboard';

  if (user?.role === 'ADMIN') {
    title = 'Admin Dashboard';
  } else title = 'Provider Dashboard';

  const handleLogout = () => {
    logout(undefined, { onSuccess: () => router.push('/login') });
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsFix.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer">
                  <User2 /> {user ? user.email : 'User Email'}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-60">
                <DropdownMenuItem className="cursor-pointer">
                  <Link className="w-full" href="/dashboard/profile">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <span className="w-full" onClick={handleLogout}>
                    Sign out
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AdminSidebar;
