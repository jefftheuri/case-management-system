
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  User,
  Building, 
  CreditCard, 
  Bell, 
  Users, 
  Shield, 
  FileText,
  Database,
  Settings as SettingsIcon,
  Search
} from "lucide-react";

const Settings = () => {
  const settingSections = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: User,
      iconColor: 'text-blue-600',
      items: [
        'Profile Information',
        'Security & Password',
        'Two-Factor Authentication',
        'Language & Theme',
        'Regional Settings',
        'Login History'
      ]
    },
    {
      id: 'firm',
      title: 'Firm Settings',
      icon: Building,
      iconColor: 'text-green-600',
      items: [
        'Firm Information',
        'Team Members',
        'Role Permissions',
        'Office Locations',
        'Practice Areas',
        'Registration Details'
      ]
    },
    {
      id: 'practice',
      title: 'Case & Practice',
      icon: FileText,
      iconColor: 'text-purple-600',
      items: [
        'Case Types & Templates',
        'Document Templates',
        'Workflow Settings',
        'Court Integration',
        'Filing Requirements',
        'Case Categories'
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Payments',
      icon: CreditCard,
      iconColor: 'text-green-600',
      items: [
        'Payment Methods',
        'Transaction Fees',
        'Invoicing Settings',
        'Billing Templates',
        'Tax Configuration',
        'Payment Processing'
      ]
    },
    {
      id: 'documents',
      title: 'Document Storage',
      icon: Database,
      iconColor: 'text-orange-600',
      items: [
        'Storage Limits',
        'Access Permissions',
        'File Organization',
        'Backup Settings',
        'Version Control',
        'Security Policies'
      ]
    },
    {
      id: 'client-portal',
      title: 'Client Portal',
      icon: Users,
      iconColor: 'text-blue-600',
      items: [
        'Portal Settings',
        'Client Access',
        'Communication Tools',
        'Document Sharing',
        'Case Updates',
        'Client Permissions'
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance & Security',
      icon: Shield,
      iconColor: 'text-red-600',
      items: [
        'Security Settings',
        'Data Protection',
        'Audit Logs',
        'Compliance Reports',
        'Privacy Controls',
        'Regulatory Settings'
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      iconColor: 'text-orange-600',
      items: [
        'Email Notifications',
        'SMS Notifications', 
        'Push Notifications',
        'Calendar Reminders',
        'System Alerts',
        'Custom Notifications'
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Settings',
      icon: SettingsIcon,
      iconColor: 'text-gray-600',
      items: [
        'System Configuration',
        'API Settings',
        'Integration Management',
        'Backup & Restore',
        'System Logs',
        'Performance Settings'
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your business settings and preferences
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search settings..." 
            className="pl-10"
          />
        </div>

        {/* Settings Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Card key={section.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <IconComponent className={`h-5 w-5 ${section.iconColor}`} />
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {section.items.map((item, index) => (
                      <div
                        key={index}
                        className="text-sm text-muted-foreground hover:text-foreground cursor-pointer py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          console.log(`Navigate to: ${section.id}/${item}`);
                          // TODO: Implement navigation or dialog opening
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
