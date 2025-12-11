import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { supabase } from '../../lib/supabase';
import { Users, Link2, Eye, Shield } from 'lucide-react';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLinks: 0,
    totalClicks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminStats();
  }, []);

  const loadAdminStats = async () => {
    try {
      const { data: users } = await supabase.from('user_profiles').select('id');
      const { data: links } = await supabase.from('links').select('id, clicks');

      const totalClicks = links?.reduce((sum, link) => sum + (link.clicks || 0), 0) || 0;

      setStats({
        totalUsers: users?.length || 0,
        totalLinks: links?.length || 0,
        totalClicks,
      });
    } catch (error) {
      console.error('Error loading admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">System overview and management</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading statistics...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-10 h-10 opacity-80" />
                  <div className="text-right">
                    <p className="text-sm opacity-90">Total Users</p>
                    <p className="text-4xl font-bold">{stats.totalUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Link2 className="w-10 h-10 opacity-80" />
                  <div className="text-right">
                    <p className="text-sm opacity-90">Total Links</p>
                    <p className="text-4xl font-bold">{stats.totalLinks}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Eye className="w-10 h-10 opacity-80" />
                  <div className="text-right">
                    <p className="text-sm opacity-90">Total Clicks</p>
                    <p className="text-4xl font-bold">{stats.totalClicks}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-8">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Admin Features</h2>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
                  <p className="text-sm text-gray-600">View and manage all users</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Link Management</h3>
                  <p className="text-sm text-gray-600">View and manage all links</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">System Settings</h3>
                  <p className="text-sm text-gray-600">Configure global settings</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                  <p className="text-sm text-gray-600">View system-wide analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
