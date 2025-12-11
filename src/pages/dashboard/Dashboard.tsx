import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Link } from '../../components/Router';
import { Button } from '../../components/ui/Button';
import { linkService } from '../../lib/linkService';
import {
  Link2,
  BarChart3,
  TrendingUp,
  Eye,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { formatNumber } from '../../lib/utils';

export function Dashboard() {
  const [stats, setStats] = useState({
    totalLinks: 0,
    totalClicks: 0,
    activeLinks: 0,
  });
  const [recentLinks, setRecentLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const links = await linkService.getUserLinks();
      setRecentLinks(links.slice(0, 5));

      const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
      const activeLinks = links.filter(link => link.is_active).length;

      setStats({
        totalLinks: links.length,
        totalClicks,
        activeLinks,
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's your overview</p>
          </div>
          <Link to="/dashboard/links/create">
            <Button variant="primary">
              <Plus className="w-5 h-5" />
              Create Link
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Link2 className="w-10 h-10 opacity-80" />
                <div className="text-right">
                  <p className="text-sm opacity-90">Total Links</p>
                  <p className="text-4xl font-bold">
                    {loading ? '...' : formatNumber(stats.totalLinks)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <TrendingUp className="w-4 h-4" />
                <span>{stats.activeLinks} active</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-10 h-10 opacity-80" />
                <div className="text-right">
                  <p className="text-sm opacity-90">Total Clicks</p>
                  <p className="text-4xl font-bold">
                    {loading ? '...' : formatNumber(stats.totalClicks)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <TrendingUp className="w-4 h-4" />
                <span>All time</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Eye className="w-10 h-10 opacity-80" />
                <div className="text-right">
                  <p className="text-sm opacity-90">Avg. Click Rate</p>
                  <p className="text-4xl font-bold">
                    {loading ? '...' : stats.totalLinks > 0
                      ? Math.round(stats.totalClicks / stats.totalLinks)
                      : 0
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <TrendingUp className="w-4 h-4" />
                <span>Per link</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Links</h2>
              <Link to="/dashboard/links">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : recentLinks.length === 0 ? (
              <div className="text-center py-12">
                <Link2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No links yet</h3>
                <p className="text-gray-600 mb-4">Create your first shortened link to get started</p>
                <Link to="/dashboard/links/create">
                  <Button variant="primary">
                    <Plus className="w-5 h-5" />
                    Create Your First Link
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentLinks.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {link.title || 'Untitled'}
                      </h4>
                      <p className="text-sm text-blue-600 truncate">
                        /{link.short_code}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Clicks</p>
                        <p className="text-lg font-semibold text-gray-900">{link.clicks || 0}</p>
                      </div>
                      <Link to={`/dashboard/links/${link.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
