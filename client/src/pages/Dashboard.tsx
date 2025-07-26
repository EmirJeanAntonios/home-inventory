import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useIsAuthenticated, useLogout } from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useIsAuthenticated();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Home Inventory Dashboard</h1>
          <Button 
            onClick={handleLogout}
            variant="outline"
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{user?.name}</p>
                
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user?.email}</p>
                
                <p className="text-sm text-gray-600">Role</p>
                <p className="font-medium capitalize">{user?.role.name}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Items</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Categories</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Recent Additions</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Welcome to your Home Inventory system! Here you'll be able to manage all your household items, 
              track their value, and organize them by categories.
            </p>
            <div className="space-y-2">
              <p className="text-sm">🏠 <strong>Add Items:</strong> Start by adding items to your inventory</p>
              <p className="text-sm">📂 <strong>Organize:</strong> Create categories to keep things organized</p>
              <p className="text-sm">💰 <strong>Track Value:</strong> Monitor the total value of your belongings</p>
              <p className="text-sm">📊 <strong>Reports:</strong> Generate reports for insurance or personal use</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 