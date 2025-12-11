import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { linkService } from '../../lib/linkService';
import { formatNumber } from '../../lib/utils';
import { BarChart3, Globe, Monitor, TrendingUp } from 'lucide-react';

export function Analytics() {
  const [links, setLinks] = useState<any[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [clicksByCountry, setClicksByCountry] = useState<Record<string, number>>({});
  const [clicksByDevice, setClicksByDevice] = useState<Record<string, number>>({});

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const userLinks = await linkService.getUserLinks();
      setLinks(userLinks);

      let clicks = 0;
      const countryMap: Record<string, number> = {};
      const deviceMap: Record<string, number> = {};

      for (const link of userLinks) {
        clicks += link.clicks || 0;
        const analytics = await linkService.getLinkAnalytics(link.id);

        analytics.forEach((click: any) => {
          if (click.country) {
            countryMap[click.country] = (countryMap[click.country] || 0) + 1;
          }
          if (click.device) {
            deviceMap[click.device] = (deviceMap[click.device] || 0) + 1;
          }
        });
      }

      setTotalClicks(clicks);
      setClicksByCountry(countryMap);
      setClicksByDevice(deviceMap);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const topCountries = Object.entries(clicksByCountry)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const topDevices = Object.entries(clicksByDevice)
    .sort(([, a], [, b]) => b - a);

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Detailed insights about your links</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading analytics...</div>
        ) : (
          <>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <BarChart3 className="w-8 h-8 mb-2 opacity-80" />
                  <p className="text-sm opacity-90">Total Clicks</p>
                  <p className="text-3xl font-bold">{formatNumber(totalClicks)}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
                  <p className="text-sm opacity-90">Total Links</p>
                  <p className="text-3xl font-bold">{links.length}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                <CardContent className="p-6">
                  <Globe className="w-8 h-8 mb-2 opacity-80" />
                  <p className="text-sm opacity-90">Countries</p>
                  <p className="text-3xl font-bold">{Object.keys(clicksByCountry).length}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
                <CardContent className="p-6">
                  <Monitor className="w-8 h-8 mb-2 opacity-80" />
                  <p className="text-sm opacity-90">Avg per Link</p>
                  <p className="text-3xl font-bold">
                    {links.length > 0 ? Math.round(totalClicks / links.length) : 0}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Top Countries</h2>
                </CardHeader>
                <CardContent>
                  {topCountries.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No data available</p>
                  ) : (
                    <div className="space-y-3">
                      {topCountries.map(([country, clicks]) => (
                        <div key={country} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-gray-400" />
                            <span className="font-medium text-gray-900">{country || 'Unknown'}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${(clicks / topCountries[0][1]) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-gray-600 font-semibold w-12 text-right">
                              {clicks}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Devices</h2>
                </CardHeader>
                <CardContent>
                  {topDevices.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No data available</p>
                  ) : (
                    <div className="space-y-3">
                      {topDevices.map(([device, clicks]) => (
                        <div key={device} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Monitor className="w-5 h-5 text-gray-400" />
                            <span className="font-medium text-gray-900 capitalize">
                              {device || 'Unknown'}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{
                                  width: `${(clicks / topDevices[0][1]) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-gray-600 font-semibold w-12 text-right">
                              {clicks}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
