import { useState, FormEvent } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useRouter } from '../../components/Router';
import { linkService } from '../../lib/linkService';
import { validateUrl, generateShortCode } from '../../lib/utils';
import { Link, Calendar, Lock, ArrowLeft } from 'lucide-react';

export function CreateLink() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [title, setTitle] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [password, setPassword] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { navigate } = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateUrl(originalUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);

    try {
      const link = await linkService.createLink({
        originalUrl,
        title,
        customCode: customCode || undefined,
        password: password || undefined,
        expiresAt: expiresAt || undefined,
      });

      navigate('/dashboard/links');
    } catch (err: any) {
      setError(err.message || 'Failed to create link');
    } finally {
      setLoading(false);
    }
  };

  const generateRandom = () => {
    setCustomCode(generateShortCode(6));
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard/links')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Links
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create Short Link</h1>
          <p className="text-gray-600 mt-1">Shorten your URL and customize it</p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Link Details</h2>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="url"
                label="Destination URL"
                placeholder="https://example.com/your-long-url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                icon={<Link className="w-5 h-5" />}
                required
              />

              <Input
                type="text"
                label="Title (Optional)"
                placeholder="My Awesome Link"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Short Code (Optional)
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {window.location.origin}/
                    </span>
                    <input
                      type="text"
                      placeholder="my-link"
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      className="w-full pl-32 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <Button type="button" variant="outline" onClick={generateRandom}>
                    Generate
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Options</h3>

                <div className="space-y-4">
                  <Input
                    type="password"
                    label="Password Protection (Optional)"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock className="w-5 h-5" />}
                  />

                  <Input
                    type="datetime-local"
                    label="Expiration Date (Optional)"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    icon={<Calendar className="w-5 h-5" />}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  loading={loading}
                >
                  Create Short Link
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard/links')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
