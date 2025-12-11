import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { Link } from '../../components/Router';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { linkService } from '../../lib/linkService';
import { copyToClipboard, formatDate, generateQRCode } from '../../lib/utils';
import {
  Plus,
  Search,
  Link2,
  Copy,
  QrCode,
  BarChart3,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';

export function Links() {
  const [links, setLinks] = useState<any[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadLinks();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredLinks(
        links.filter(
          (link) =>
            link.title.toLowerCase().includes(search.toLowerCase()) ||
            link.short_code.toLowerCase().includes(search.toLowerCase()) ||
            link.original_url.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredLinks(links);
    }
  }, [search, links]);

  const loadLinks = async () => {
    try {
      const data = await linkService.getUserLinks();
      setLinks(data);
      setFilteredLinks(data);
    } catch (error) {
      console.error('Error loading links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (shortCode: string, linkId: string) => {
    const url = `${window.location.origin}/${shortCode}`;
    await copyToClipboard(url);
    setCopiedId(linkId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (linkId: string) => {
    if (confirm('Are you sure you want to delete this link?')) {
      try {
        await linkService.deleteLink(linkId);
        loadLinks();
      } catch (error) {
        console.error('Error deleting link:', error);
      }
    }
  };

  const showQRCode = (link: any) => {
    setSelectedLink(link);
    setQrModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Links</h1>
            <p className="text-gray-600 mt-1">Manage all your shortened links</p>
          </div>
          <Link to="/dashboard/links/create">
            <Button variant="primary">
              <Plus className="w-5 h-5" />
              Create Link
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <Input
              type="text"
              placeholder="Search links by title, code, or URL..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading links...</div>
        ) : filteredLinks.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Link2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {search ? 'No links found' : 'No links yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {search ? 'Try a different search term' : 'Create your first shortened link'}
              </p>
              {!search && (
                <Link to="/dashboard/links/create">
                  <Button variant="primary">
                    <Plus className="w-5 h-5" />
                    Create Link
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredLinks.map((link) => (
              <Card key={link.id} hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {link.title || 'Untitled Link'}
                        </h3>
                        {!link.is_active && (
                          <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <code className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded">
                          {window.location.origin}/{link.short_code}
                        </code>
                        <button
                          onClick={() => handleCopy(link.short_code, link.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Copy link"
                        >
                          {copiedId === link.id ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <a
                        href={link.original_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1 truncate"
                      >
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{link.original_url}</span>
                      </a>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4" />
                          <span>{link.clicks || 0} clicks</span>
                        </div>
                        <span>Created {formatDate(link.created_at)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showQRCode(link)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="QR Code"
                      >
                        <QrCode className="w-5 h-5 text-gray-600" />
                      </button>
                      <Link to={`/dashboard/analytics/${link.id}`}>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Analytics"
                        >
                          <BarChart3 className="w-5 h-5 text-gray-600" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Modal
          isOpen={qrModalOpen}
          onClose={() => setQrModalOpen(false)}
          title="QR Code"
          size="sm"
        >
          {selectedLink && (
            <div className="p-6 text-center">
              <img
                src={generateQRCode(`${window.location.origin}/${selectedLink.short_code}`, 300)}
                alt="QR Code"
                className="mx-auto mb-4 rounded-lg"
              />
              <p className="text-sm text-gray-600 mb-4">{selectedLink.title}</p>
              <a
                href={generateQRCode(`${window.location.origin}/${selectedLink.short_code}`, 1000)}
                download={`qr-${selectedLink.short_code}.png`}
                className="inline-block"
              >
                <Button variant="primary">Download QR Code</Button>
              </a>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}
