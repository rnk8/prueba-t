import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Users, MonitorSpeaker, BookOpen, Folder, LayoutGrid, FileBox, BoomBox, SignalZero, SigmaSquare, Projector, ProjectorIcon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    
    {
        title: 'Users',
        url: '/users',
        icon: Users,
    },
    {
        title: 'Categories',
        url: route('admin.categories.index'), // Usar helper de rutas
        icon: BoomBox,
    },
    {
        title: 'Unidades De Medida',
        url: route('admin.units.index'), // Usar helper de rutas
        icon: SigmaSquare,
    },
    {
        title: 'Productos',
        url: route('admin.products.index'), // Usar helper de rutas
        icon: Projector,
    },
    {
        title: 'Ventas',
        url: route('admin.sales.index'), // Usar helper de rutas
        icon: ProjectorIcon,
    },
    {
        title: 'Caja',
        url: '/',
        icon: MonitorSpeaker,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: '/settings/profile',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: '',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
