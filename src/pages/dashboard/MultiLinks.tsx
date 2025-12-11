import { DashboardLayout } from '../../components/DashboardLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Layers, Plus } from 'lucide-react';

export function MultiLinks() {
  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Multi-Link Pages</h1>
            <p className="text-gray-600 mt-1">Create pages with multiple quick links</p>
          </div>
          <Button variant="primary">
            <Plus className="w-5 h-5" />
            Create Multi-Link Page
          </Button>
        </div>

        <Card>
          <CardContent className="text-center py-12">
            <Layers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No multi-link pages yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first multi-link page to organize multiple links
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
