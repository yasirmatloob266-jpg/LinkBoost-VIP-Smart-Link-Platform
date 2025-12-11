import { DashboardLayout } from '../../components/DashboardLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Plus } from 'lucide-react';

export function LandingPages() {
  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Landing Pages</h1>
            <p className="text-gray-600 mt-1">Host custom HTML landing pages</p>
          </div>
          <Button variant="primary">
            <Plus className="w-5 h-5" />
            Create Landing Page
          </Button>
        </div>

        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No landing pages yet</h3>
            <p className="text-gray-600 mb-4">
              Upload and host custom HTML landing pages
            </p>
            <Button variant="primary">
              <Plus className="w-5 h-5" />
              Create Your First Page
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
